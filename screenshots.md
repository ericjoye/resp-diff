# Screenshots — Resp Diff

## Screenshot 1: DevTools Panel
```
┌─────────────────────────────────────────────────┐
│  DevTools — Resp Diff                           │
├─────────────────────────────────────────────────┤
│  Captures: 3                          [Clear]   │
│  ─────────────────────────────────────────────── │
│  #1  GET /api/users/1     200 OK    14:30:22    │
│  #2  GET /api/users/1     200 OK    14:31:05    │
│  #3  GET /api/users/1     500 ERR   14:32:11    │
│                                                 │
│  [Diff #1 vs #2]  [Diff #1 vs #3]  [Diff All]  │
└─────────────────────────────────────────────────┘
```

## Screenshot 2: Diff View
```
┌─────────────────────────────────────────────────┐
│  Diff: #1 vs #3                                  │
├─────────────────────────────────────────────────┤
│  ┌─────────────────┬─────────────────┐          │
│  │ #1 — 14:30:22   │ #3 — 14:32:11   │          │
│  │ 200 OK          │ 500 Internal    │          │
│  ├─────────────────┼─────────────────┤          │
│  │ {               │ {               │          │
│  │   "id": 1,      │   "error": {    │          │
│  │   "name": "John"│     "code": 500,│          │
│  │   "email":...   │     "msg": "..." │          │
│  │ }               │   }             │          │
│  └─────────────────┴─────────────────┘          │
│                                                 │
│  Changes: +3 -2 ~1                              │
│  [Export JSON] [Copy cURL] [Share]              │
└─────────────────────────────────────────────────┘
```

## Screenshot 3: Capture Settings
```
┌──────────────────────────────────────┐
│  Resp Diff Settings                  │
├──────────────────────────────────────┤
│  Auto-capture: [✓] Enabled          │
│  Filter: [GET, POST]                 │
│  Ignore headers: [x-request-id, ...] │
│  Max captures: [50]                  │
│  Storage: [chrome.storage.local]     │
└──────────────────────────────────────┘
```

## Notes for real screenshots
- Open DevTools on a real API-heavy site
- Show the panel with captured responses
- Show the diff with highlighted changes
- Show export options