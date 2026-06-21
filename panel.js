// panel.js — Resp Diff panel logic
// Handles: network capture, snapshot storage, JSON diff, UI rendering

(function () {
  'use strict';

  // State
  let snapshots = [];
  let selectedForDiff = { a: null, b: null };

  // DOM refs
  const $ = (id) => document.getElementById(id);
  const snapList = $('snapshotList');
  const diffASelect = $('diffASelect');
  const diffBSelect = $('diffBSelect');
  const diffBtn = $('diffBtn');
  const swapBtn = $('swapBtn');
  const diffHeader = $('diffHeader');
  const diffLeft = $('diffLeft');
  const diffRight = $('diffRight');
  const toastEl = $('toast');

  // Toast
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2000);
  }

  // Storage
  function loadSnapshots() {
    chrome.storage.local.get({ respDiffSnapshots: [] }, (data) => {
      snapshots = data.respDiffSnapshots || [];
      renderSnapshotList();
      updateDiffSelects();
    });
  }

  function saveSnapshots() {
    chrome.storage.local.set({ respDiffSnapshots: snapshots }, () => {
      renderSnapshotList();
      updateDiffSelects();
    });
  }

  // Network Capture
  function initNetworkCapture() {
    if (!chrome.devtools || !chrome.devtools.network) {
      showToast('DevTools API not available');
      return;
    }

    chrome.devtools.network.onRequestFinished.addListener((request) => {
      if (!request.response || !request.response.bodySize) return;
      const url = request.request.url;
      if (!url.startsWith('http')) return;

      const entry = {
        id: 'req_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
        url: url,
        method: request.request.method,
        status: request.response.status,
        statusText: request.response.statusText,
        contentType: getContentType(request.response),
        timestamp: Date.now(),
        captured: false,
        body: null,
      };

      snapshots.unshift(entry);
      if (snapshots.length > 100) snapshots = snapshots.slice(0, 100);
      saveSnapshots();
    });
  }

  function getContentType(res) {
    const ct = (res.headers || []).find(h => h.name.toLowerCase() === 'content-type');
    return ct ? ct.value : '';
  }

  function captureBody(snapshotId) {
    const snap = snapshots.find(s => s.id === snapshotId);
    if (!snap) return;

    chrome.devtools.network.getHAR((har) => {
      if (!har || !har.entries) {
        showToast('Could not get HAR data');
        return;
      }

      const entry = har.entries.find(e => {
        return e.request.url === snap.url &&
               e.request.method === snap.method &&
               Math.abs(new Date(e.startedDateTime).getTime() - snap.timestamp) < 5000;
      });

      if (!entry || !entry.response || !entry.response.content || !entry.response.content.text) {
        showToast('Response body not available (may be binary or too large)');
        return;
      }

      const bodyText = entry.response.content.text;
      let parsed;
      try {
        parsed = JSON.parse(bodyText);
      } catch (e) {
        parsed = { _raw: bodyText };
      }

      snap.body = parsed;
      snap.captured = true;
      snap.contentType = entry.response.content.mimeType || snap.contentType;
      saveSnapshots();
      showToast('Captured: ' + snap.method + ' ' + snap.status);
    });
  }

  // Snapshot List Rendering
  function renderSnapshotList() {
    if (snapshots.length === 0) {
      snapList.innerHTML = '<div class="empty-msg">No snapshots yet. Browse any site and responses will appear below — click to capture body.</div>';
      return;
    }

    snapList.innerHTML = snapshots.map((s) => {
      let path;
      try { path = new URL(s.url).pathname + (new URL(s.url).search || ''); } catch(e) { path = s.url; }
      const time = new Date(s.timestamp).toLocaleTimeString();
      const statusClass = s.status >= 400 ? ' error' : '';
      const selClass = (selectedForDiff.a === s.id || selectedForDiff.b === s.id) ? ' selected' : '';
      const capturedIcon = s.captured ? '●' : '○';

      return '<div class="snapshot-item' + selClass + '" data-id="' + s.id + '">' +
        '<span class="method ' + s.method + '">' + s.method + '</span>' +
        '<span class="url" title="' + s.url + '">' + capturedIcon + ' ' + path + '</span>' +
        '<span class="status' + statusClass + '">' + s.status + '</span>' +
        '<span class="time">' + time + '</span>' +
        '<button class="del-btn" data-del="' + s.id + '" title="Delete">×</button>' +
        '</div>';
    }).join('');

    snapList.querySelectorAll('.snapshot-item').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('del-btn')) return;
        onSnapshotClick(el.dataset.id);
      });
    });

    snapList.querySelectorAll('.del-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteSnapshot(btn.dataset.del);
      });
    });
  }

  function onSnapshotClick(id) {
    const snap = snapshots.find(s => s.id === id);
    if (!snap) return;

    if (!snap.captured) {
      captureBody(id);
      return;
    }

    if (selectedForDiff.a === id) { selectedForDiff.a = null; }
    else if (selectedForDiff.b === id) { selectedForDiff.b = null; }
    else if (selectedForDiff.a === null) { selectedForDiff.a = id; }
    else if (selectedForDiff.b === null) { selectedForDiff.b = id; }
    else { selectedForDiff.b = id; }

    renderSnapshotList();
    updateDiffSelects();
    updateDiffButton();
  }

  function deleteSnapshot(id) {
    snapshots = snapshots.filter(s => s.id !== id);
    if (selectedForDiff.a === id) selectedForDiff.a = null;
    if (selectedForDiff.b === id) selectedForDiff.b = null;
    saveSnapshots();
    updateDiffSelects();
    updateDiffButton();
  }

  // Diff Select Dropdowns
  function updateDiffSelects() {
    const captured = snapshots.filter(s => s.captured && s.body);
    const makeOptions = (selId) => {
      let h = '<option value="">— Select —</option>';
      captured.forEach(s => {
        let path;
        try { path = new URL(s.url).pathname; } catch(e) { path = s.url; }
        h += '<option value="' + s.id + '"' + (s.id === selId ? ' selected' : '') + '>' + s.method + ' ' + path + ' [' + s.status + ']</option>';
      });
      return h;
    };
    diffASelect.innerHTML = makeOptions(selectedForDiff.a);
    diffBSelect.innerHTML = makeOptions(selectedForDiff.b);
  }

  function updateDiffButton() {
    const hasBoth = selectedForDiff.a && selectedForDiff.b;
    diffBtn.disabled = !hasBoth;
    swapBtn.disabled = !hasBoth;
  }

  diffASelect.addEventListener('change', () => {
    selectedForDiff.a = diffASelect.value || null;
    renderSnapshotList();
    updateDiffButton();
  });

  diffBSelect.addEventListener('change', () => {
    selectedForDiff.b = diffBSelect.value || null;
    renderSnapshotList();
    updateDiffButton();
  });

  swapBtn.addEventListener('click', () => {
    const tmp = selectedForDiff.a;
    selectedForDiff.a = selectedForDiff.b;
    selectedForDiff.b = tmp;
    renderSnapshotList();
    updateDiffSelects();
    runDiff();
  });

  // Diff Algorithm
  function jsonDiff(a, b, path) {
    path = path || '';
    const changes = [];
    if (a === b) return changes;
    if (typeof a !== typeof b) {
      changes.push({ path, type: 'changed', oldVal: a, newVal: b });
      return changes;
    }
    if (a === null || b === null) {
      if (a !== b) changes.push({ path, type: 'changed', oldVal: a, newVal: b });
      return changes;
    }
    if (typeof a !== 'object') {
      changes.push({ path, type: 'changed', oldVal: a, newVal: b });
      return changes;
    }
    if (Array.isArray(a) !== Array.isArray(b)) {
      changes.push({ path, type: 'changed', oldVal: a, newVal: b });
      return changes;
    }
    const allKeys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
    for (const key of allKeys) {
      const childPath = path ? path + '.' + key : key;
      if (!(key in a)) {
        changes.push({ path: childPath, type: 'added', oldVal: undefined, newVal: b[key] });
      } else if (!(key in b)) {
        changes.push({ path: childPath, type: 'removed', oldVal: a[key], newVal: undefined });
      } else {
        changes.push(...jsonDiff(a[key], b[key], childPath));
      }
    }
    return changes;
  }

  // Render JSON with diff highlighting
  function renderJsonWithDiff(obj, changes, side) {
    const changeMap = new Map();
    for (const c of changes) changeMap.set(c.path, c);

    function getLineClass(path) {
      const change = changeMap.get(path);
      if (!change) return '';
      if (change.type === 'added' && side === 'right') return 'added';
      if (change.type === 'removed' && side === 'left') return 'removed';
      if (change.type === 'changed') return 'changed';
      return '';
    }

    function render(val, path, depth) {
      const indent = '  '.repeat(depth);
      const cls = getLineClass(path);

      if (val === null) {
        return '<div class="diff-line ' + cls + '">' + indent + '<span class="val-null">null</span></div>';
      }
      if (typeof val === 'string') {
        return '<div class="diff-line ' + cls + '">' + indent + '<span class="val-string">"' + esc(val) + '"</span></div>';
      }
      if (typeof val === 'number') {
        return '<div class="diff-line ' + cls + '">' + indent + '<span class="val-number">' + val + '</span></div>';
      }
      if (typeof val === 'boolean') {
        return '<div class="diff-line ' + cls + '">' + indent + '<span class="val-bool">' + val + '</span></div>';
      }
      if (Array.isArray(val)) {
        if (val.length === 0) return '<div class="diff-line ' + cls + '">' + indent + '[]</div>';
        let h = '<div class="diff-line ' + cls + '">' + indent + '[</div>';
        val.forEach((item, i) => { h += render(item, path + '[' + i + ']', depth + 1); });
        h += '<div class="diff-line ' + cls + '">' + indent + ']</div>';
        return h;
      }
      if (typeof val === 'object') {
        const keys = Object.keys(val);
        if (keys.length === 0) return '<div class="diff-line ' + cls + '">' + indent + '{}</div>';
        let h = '<div class="diff-line ' + cls + '">' + indent + '{</div>';
        keys.forEach(k => {
          const cp = path ? path + '.' + k : k;
          h += '<div class="diff-line ' + getLineClass(cp) + '">' + indent + '  <span class="key">"' + esc(k) + '"</span>: ';
          if (val[k] !== null && typeof val[k] === 'object') {
            h += '\n' + render(val[k], cp, depth + 1);
          } else {
            const inner = render(val[k], cp, 0);
            h += inner.replace(/<[^>]+>/g, '').trim() + '</div>';
          }
        });
        h += '<div class="diff-line ' + cls + '">' + indent + '}</div>';
        return h;
      }
      return '<div class="diff-line ' + cls + '">' + indent + esc(String(val)) + '</div>';
    }

    return render(obj, '', 0);
  }

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function runDiff() {
    const snapA = snapshots.find(s => s.id === selectedForDiff.a);
    const snapB = snapshots.find(s => s.id === selectedForDiff.b);
    if (!snapA || !snapB || !snapA.body || !snapB.body) {
      diffHeader.innerHTML = 'Select two captured snapshots to diff.';
      diffLeft.innerHTML = '<h3>Snapshot A</h3>';
      diffRight.innerHTML = '<h3>Snapshot B</h3>';
      return;
    }

    const changes = jsonDiff(snapA.body, snapB.body);
    const added = changes.filter(c => c.type === 'added').length;
    const removed = changes.filter(c => c.type === 'removed').length;
    const changed = changes.filter(c => c.type === 'changed').length;

    let pathA, pathB;
    try { pathA = new URL(snapA.url).pathname; } catch(e) { pathA = snapA.url; }
    try { pathB = new URL(snapB.url).pathname; } catch(e) { pathB = snapB.url; }

    diffHeader.innerHTML =
      '<strong>Diff:</strong> ' + snapA.method + ' ' + pathA + ' vs ' + snapB.method + ' ' + pathB +
      ' &nbsp; <span class="added">+' + added + ' added</span>' +
      ' <span class="removed">-' + removed + ' removed</span>' +
      ' <span class="changed">~' + changed + ' changed</span>' +
      ' &nbsp;(' + changes.length + ' total)';

    diffLeft.innerHTML = '<h3>A: ' + snapA.method + ' ' + pathA + ' [' + snapA.status + ']</h3>' + renderJsonWithDiff(snapA.body, changes, 'left');
    diffRight.innerHTML = '<h3>B: ' + snapB.method + ' ' + pathB + ' [' + snapB.status + ']</h3>' + renderJsonWithDiff(snapB.body, changes, 'right');
  }

  diffBtn.addEventListener('click', runDiff);

  // Clear All
  $('clearAllBtn').addEventListener('click', () => {
    if (!confirm('Clear all snapshots?')) return;
    snapshots = [];
    selectedForDiff = { a: null, b: null };
    saveSnapshots();
    updateDiffSelects();
    updateDiffButton();
    diffHeader.innerHTML = 'Select two snapshots above to diff.';
    diffLeft.innerHTML = '<h3>Snapshot A</h3>';
    diffRight.innerHTML = '<h3>Snapshot B</h3>';
    showToast('All snapshots cleared');
  });

  // Refresh
  $('refreshBtn').addEventListener('click', () => { loadSnapshots(); showToast('Refreshed'); });

  // Init
  loadSnapshots();
  initNetworkCapture();
})();
