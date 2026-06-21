# resp-diff

## Title
resp-diff — API Response Diff for Chrome DevTools

## One-liner
One-click capture and diff of API responses directly in Chrome DevTools. See exactly what changed between staging and production.

## Target user
Backend and full-stack developers who work with REST/GraphQL APIs daily. Especially useful for developers who:
- Compare API responses across environments (local/staging/production)
- Debug "it worked yesterday" regressions by diffing responses before/after deploys
- Validate API contract changes during development

## Problem
Developers constantly need to answer: "Did this API response change?" Right now they:
1. Open DevTools Network tab, find the request, manually eyeball two responses
2. Copy both responses to an external diff tool (diffchecker.com, etc.)
3. Use Postman collections to save and compare — heavyweight for a quick check

There is no lightweight Chrome extension that lets you snapshot a response and diff it later without leaving the browser. Existing solutions are either full proxy tools (Charles, Proxyman) or online diff tools that require copy-paste.

## MVP Scope (buildable in <1 hour, zero paid deps)

1. **DevTools Panel** — Adds a "Resp Diff" panel in Chrome DevTools (using `chrome.devtools.panels.create`)
2. **Capture Response** — One-click button in the DevTools Network tab (via content script injection) to snapshot the selected request's response body to localStorage
3. **Snapshot List** — Panel shows all captured snapshots with URL, method, status code, timestamp
4. **Side-by-Side Diff** — Select any two snapshots to see a color-coded JSON diff (added/removed/changed keys) using a pure-JS diff algorithm
5. **Clear All** — Button to clear all snapshots

### Tech approach
- **Manifest V3** Chrome extension
- **DevTools API** (`chrome.devtools.panels`, `chrome.devtools.network`) — no content script needed on pages
- **JSON diff** — pure JS implementation (no library, ~50 lines of recursive key-walk comparison)
- **Storage** — `chrome.local.storage` for snapshots (no backend)
- **UI** — Vanilla HTML/CSS/JS in the DevTools panel (no framework)
- **Zero dependencies** — everything is vanilla JS in the extension bundle

### What's OUT of scope for MVP
- Export/share snapshots
- Team collaboration
- GraphQL-specific features
- Request replay
- Response schema validation

## Risks
1. **Chrome DevTools API limitations** — `chrome.devtools.network` only provides request metadata, not response bodies. Response bodies require `chrome.devtools.network.getHAR()` + `getContent()` or a content script approach. Mitigation: use the `chrome.debugger` API as fallback, or inject a content script that intercepts `fetch`/`XMLHttpRequest`.
2. **Manifest V3 service worker lifecycle** — DevTools extensions are exempt from service worker shutdown, but need to test persistence.
3. **Monetization ceiling** — Free tier (10 snapshots) + Pro tier ($5/mo, unlimited). Small market but high intent.
4. **Competition from built-in tools** — Chrome DevTools already has "Copy as cURL" and HAR export. Differentiation is the diff workflow, not capture.

## Monetization
- **Free**: 10 snapshots, basic diff
- **Pro** ($5/mo or $40/yr): Unlimited snapshots, export diff as JSON/markdown, dark mode, snapshot folders/tags
- Chrome Web Store listing for organic discovery (search "api diff", "response compare")

## Definition of done for the MVP
- [ ] Extension loads in Chrome DevTools with a "Resp Diff" panel
- [ ] Can capture a network request's response body with one click
- [ ] Can select any two captured snapshots and see a visual JSON diff
- [ ] Snapshots persist across browser sessions (chrome.storage.local)
- [ ] Clear all snapshots button works
- [ ] Tested on a real API (e.g., jsonplaceholder.typicode.com)
- [ ] `manifest.json` is Manifest V3 compliant
- [ ] No external dependencies or CDN resources
