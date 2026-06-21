# Resp Diff — Chrome Web Store Listing

## Extension Name

**Resp Diff — API Response Diff for Chrome DevTools**

## Short Description (132 chars max)

Capture and diff API responses directly in Chrome DevTools. One-click side-by-side JSON comparison.

## Long Description

Resp Diff is a Chrome DevTools extension that captures API responses (XHR/fetch) and lets you diff them side-by-side — right inside DevTools. No more copying response bodies to external tools or manually comparing JSON.

**CAPTURE API RESPONSES**
Open DevTools (F12) and click the "Resp Diff" tab. Browse any website that makes API calls, and network requests appear in the snapshot list automatically. Click any request to capture its response body. The extension uses the `chrome.devtools.network` API to intercept responses as they arrive — no proxy, no configuration needed.

**SIDE-BY-SIDE DIFF**
Select two captured snapshots and click "Diff" to see a side-by-side JSON comparison. The recursive diff algorithm highlights added, removed, and changed values with color coding. Use "Swap" to reverse the comparison direction. All diffs are computed locally with zero dependencies.

**PERSISTENT STORAGE**
Captured snapshots persist across page navigations using `chrome.storage.local`. Come back to the Resp Diff panel after navigating to a different page — your snapshots are still there. Clear individual snapshots or use "Clear All" to start fresh.

**PERFECT FOR API DEVELOPMENT**
Whether you're debugging a REST API, comparing responses across environments, or verifying that a new deployment returns the same data as the old one, Resp Diff gives you instant visual feedback without leaving DevTools.

## Key Features

- **One-click capture** — click any network request to snapshot its response body
- **Side-by-side JSON diff** — color-coded comparison of two snapshots
- **Persistent storage** — snapshots survive page navigations
- **Swap direction** — reverse the comparison with one click
- **Zero dependencies** — pure vanilla JS recursive diff algorithm
- **DevTools native** — integrates directly into Chrome DevTools panel
- **Manifest V3** — fully compatible with latest Chrome standard

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `resp-diff/` folder
5. Open DevTools (F12) on any page — you'll see a "Resp Diff" tab

## Requirements

- Chrome 88+ (Manifest V3 support)
- No additional dependencies

## Support

- **Contact:** eric@ericjoye.com
- **GitHub:** https://github.com/ericjoye/resp-diff
- **Issues:** https://github.com/ericjoye/resp-diff/issues
- **License:** MIT

## Keywords

API, diff, JSON, DevTools, chrome extension, developer tools, API debugging, response comparison, XHR, fetch, network, REST, API testing
