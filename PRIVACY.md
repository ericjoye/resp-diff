# Privacy Policy — Resp Diff

**Last updated:** June 20, 2026

## Overview

Resp Diff ("we", "our", "the extension") is a Chrome DevTools extension that captures and diffs API responses. It provides side-by-side JSON comparison of captured network responses directly within Chrome DevTools.

## Data Collection

**Resp Diff does NOT collect, store, or transmit any personal data.**

All processing happens locally in your browser. When you use Resp Diff:

- **No data is sent to external servers.** API response capture and diffing happens entirely within Chrome DevTools. Nothing is uploaded anywhere.
- **No tracking or analytics.** We do not use Google Analytics, Mixpanel, or any other tracking service.
- **No cookies.** Resp Diff does not set or read any cookies.
- **No account required.** There is no signup, login, or user account system.

## Local Storage

The only data stored by Resp Diff is kept locally in your browser using Chrome's `chrome.storage.local` API:

- **Captured snapshots** — API response bodies you choose to capture for diffing. These are stored locally and are cleared when you click "Clear All" or close the DevTools panel.

This data never leaves your device.

## Permissions

Resp Diff requests the following Chrome permissions:

- **devtools** — To create a custom panel within Chrome DevTools.
- **storage** — To store captured snapshots locally in your browser.

## How It Works

When you open the Resp Diff panel in Chrome DevTools:

1. Network requests from the inspected page appear in the snapshot list.
2. You click requests to capture their response bodies.
3. You select two captured snapshots and click "Diff" to see a side-by-side JSON comparison.

All data is processed and displayed locally within DevTools. No data is transmitted externally.

## Third-Party Services

Resp Diff does not integrate with any third-party services.

## Changes to This Policy

We may update this privacy policy from time to time. Any changes will be reflected in the extension's listing on the Chrome Web Store and in the extension's source code.

## Contact

If you have questions about this privacy policy, contact us at: [YOUR EMAIL ADDRESS]
