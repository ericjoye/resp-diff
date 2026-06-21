# Resp Diff — API Response Diff for Chrome DevTools

One-click capture and diff of API responses directly in Chrome DevTools.

## How to load in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `resp-diff/` folder (this directory)
5. Open DevTools (F12) on any page — you'll see a "Resp Diff" tab

## How to use

1. Open DevTools (F12) → click the "Resp Diff" tab
2. Browse any website that makes API calls (XHR/fetch)
3. Network requests appear in the snapshot list automatically
4. Click a request to capture its response body (○ → ●)
5. Click two captured snapshots to select them for diffing
6. Click "Diff" to see a side-by-side JSON comparison
7. Use "Swap" to reverse the comparison direction
8. "Clear All" removes all snapshots

## Testing with a real API

Visit https://jsonplaceholder.typicode.com/ and click on any post.
The extension will capture the JSON API responses.

## Files

```
resp-diff/
├── manifest.json      # Manifest V3 config
├── devtools.html      # DevTools entry point
├── devtools.js        # Creates the panel
├── panel.html         # Panel UI (HTML + CSS)
├── panel.js           # Panel logic (capture, diff, storage)
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md          # This file
└── BUILD-REPORT.md    # Build details
```

## Tech

- Manifest V3 Chrome extension
- `chrome.devtools.panels` API for the panel
- `chrome.devtools.network` API for request capture
- `chrome.storage.local` for persistence
- Pure-JS recursive JSON diff (zero dependencies)
- Vanilla HTML/CSS/JS — no frameworks
