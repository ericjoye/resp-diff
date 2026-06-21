# Chrome Web Store Listing — resp-diff

## Name

**Resp Diff — API Response Diff Tool**

## Short Description (132 chars max)

One-click capture & side-by-side diff of API responses in Chrome DevTools. Compare JSON across environments instantly.

## Long Description

Resp Diff adds a dedicated panel to Chrome DevTools that lets you snapshot API response bodies and diff them side-by-side — without leaving the browser.

**How it works:**

1. Open DevTools → click the "Resp Diff" panel
2. Browse normally — all network requests appear automatically
3. Click any request to capture its response body (○ → ●)
4. Select two captured snapshots to see a color-coded JSON diff

**Why it's different:**

- **Built into DevTools** — no context switching, no external tools
- **Zero dependencies** — no CDN, no npm packages, no network calls from the extension itself
- **Manifest V3 compliant** — future-proof, minimal permissions
- **Privacy-first** — all data stored locally via `chrome.storage.local`, nothing leaves the browser
- **Pure-JS diff algorithm** — handles nested objects, arrays, null values, and type mismatches correctly

**Perfect for:**

- Comparing staging vs. production API responses
- Debugging "it worked yesterday" regressions
- Validating API contract changes during development
- QA-ing deployments by diffing before/after snapshots

**Permissions explained:**

- `storage`: Persist snapshots locally in your browser
- `activeTab`: Read network request data from the current tab
- `<all_urls>`: Works on any site you want to inspect

**No account. No tracking. No servers. Just a better way to debug APIs.**

## Keywords / Tags

api diff, json diff, response compare, devtools extension, api debugging, rest api, graphql, json compare, regression testing, developer tools, chrome extension

## Category

Developer Tools

## Privacy Practices

- No data collection
- No network requests from the extension
- All data stored locally in browser via chrome.storage.local
- No analytics, no tracking, no accounts
