# BUILD-REPORT: resp-diff Chrome Extension

## What was built

A Manifest V3 Chrome extension that adds a "Resp Diff" panel to Chrome DevTools.
It captures API response bodies from network requests and provides a side-by-side
JSON diff view to compare any two captured snapshots.

## File layout

```
resp-diff/
├── manifest.json       # Manifest V3 — declares devtools_page, permissions, icons
├── devtools.html       # Minimal HTML shell that loads devtools.js
├── devtools.js         # Creates the "Resp Diff" panel via chrome.devtools.panels
├── panel.html          # Full panel UI — HTML structure + all CSS (dark theme)
├── panel.js            # All logic: network capture, storage, diff, rendering
├── icons/
│   ├── icon16.png      # 16x16 extension icon (teal gradient)
│   ├── icon48.png      # 48x48 extension icon
│   └── icon128.png     # 128x128 extension icon
├── README.md           # Load instructions + usage guide
└── BUILD-REPORT.md     # This file
```

## How it works

### Network capture
- `chrome.devtools.network.onRequestFinished` fires for every completed request
- We store metadata (URL, method, status, timestamp) immediately
- Response bodies are NOT captured automatically (Chrome DevTools API limitation)
- User clicks a request in the list → we use `chrome.devtools.network.getHAR()`
  + `entry.response.content.text` to fetch the body
- Bodies are parsed as JSON (or stored as `_raw` for non-JSON)

### Storage
- Snapshots saved to `chrome.storage.local` under key `respDiffSnapshots`
- Persists across browser sessions
- Capped at 100 snapshots (FIFO eviction)

### Diff algorithm
- Pure-JS recursive key-walk comparison
- Handles: added keys, removed keys, changed values, nested objects, arrays
- Returns array of `{path, type, oldVal, newVal}` changes
- Renders side-by-side with color coding:
  - Green background = added (right side)
  - Red background = removed (left side)
  - Yellow background = changed (both sides)

### UI
- Dark theme matching Chrome DevTools aesthetic
- Snapshot list shows method badge, URL path, status code, time
- ○ = pending capture, ● = captured
- Click to capture, click again to select for diff
- Dropdown selects + click-to-select both supported
- Swap button reverses A/B

## What works
- [x] Extension loads in Chrome DevTools with "Resp Diff" panel
- [x] Network requests appear automatically in snapshot list
- [x] Click to capture response body (via HAR getContent)
- [x] Snapshots persist in chrome.storage.local
- [x] Select two snapshots → side-by-side JSON diff
- [x] Color-coded diff (added/removed/changed)
- [x] Clear all snapshots
- [x] Delete individual snapshots
- [x] Swap diff direction
- [x] Zero external dependencies — all vanilla JS
- [x] Manifest V3 compliant

## Known gaps / limitations
- Response body capture requires a click (not automatic) due to DevTools API design
- Very large responses (>5MB) may fail to capture via HAR
- Binary responses (images, etc.) are skipped (bodySize check)
- Diff is key-order-sensitive (JSON objects)
- No export/share of diff results (out of scope for MVP)
- No request headers/response headers in diff view (could be added)
- Icons are simple gradient squares (not polished)

## Deviations from brief
- None. All MVP scope items implemented.

## Testing notes
- Test on jsonplaceholder.typicode.com (REST API with JSON responses)
- Test on any SPA that uses fetch/XHR
- The extension only captures http(s) URLs (skips data:, chrome-extension:, etc.)
