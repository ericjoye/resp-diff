# LAUNCH PLAN — resp-diff

**Date:** 2026-06-20
**Slug:** resp-diff
**Product:** Chrome DevTools extension for API response diffing
**QA Status:** PASS (19/19 tests, all 10 acceptance criteria met)

---

## 1. Launch Channels (ranked by impact)

| # | Channel | Effort | Expected Impact | Priority |
|---|---------|--------|-----------------|----------|
| 1 | Chrome Web Store | Medium | High — organic discovery from developers searching "api diff" | #1 |
| 2 | r/webdev + r/javascript + r/ExperiencedDevs (Reddit) | Low | Medium — direct developer audience | #2 |
| 3 | Hacker News "Show HN" | Low | High if it resonates, unpredictable | #3 |
| 4 | Twitter/X (dev community) | Low | Medium — thread showing before/after diff | #4 |
| 5 | Dev.to blog post | Medium | Low-Medium — SEO long-term value | #5 |
| 6 | Chrome Extension developer forums | Low | Low — niche but targeted | #6 |
| 7 | Product Hunt | Low | Medium — depends on day/timing | #7 |

---

## 2. First-Week Launch Timeline

### Day 0 (Today) — Pre-launch
- [ ] Human: Set up Chrome Web Store developer account ($5 one-time fee)
- [ ] Human: Create Gumroad/Paddle account for Pro tier payments
- [ ] Human: Design proper icon set (current icons are gradient squares — consider hiring designer on Fiverr for $20-50)
- [ ] Human: Record 30-second demo GIF/video for store listing

### Day 1 — Launch Day
- [ ] Human: Upload extension to Chrome Web Store (zip the extension directory)
- [ ] Human: Submit for review (typically 1-3 days for first submission)
- [ ] Write and schedule Reddit posts (r/webdev, r/javascript)
- [ ] Draft "Show HN" post
- [ ] Draft Twitter thread

### Day 2-3 — Wait for CWS review
- [ ] Publish Reddit posts
- [ ] Publish Twitter thread
- [ ] Prepare dev.to blog post (tutorial: "How I built a zero-dependency Chrome extension for API debugging")
- [ ] Set up basic analytics (optional — respect privacy-first positioning)

### Day 4-5 — Post-approval push
- [ ] If approved: publish "Show HN" on Hacker News
- [ ] Submit to Product Hunt
- [ ] Share in relevant Discord/Slack communities (Reactiflux, Devcord, etc.)
- [ ] Email any personal contacts who are backend developers

### Day 6-7 — Consolidate
- [ ] Monitor Chrome Web Store reviews and respond
- [ ] Monitor Reddit/Twitter engagement
- [ ] Fix any reported bugs immediately
- [ ] Collect feedback for v1.1 roadmap

---

## 3. Success Metrics (first 30 days)

| Metric | Target |
|--------|--------|
| Chrome Web Store installs | 100+ |
| CWS review rating | 4.0+ stars |
| Pro tier conversions | 2-5 (2-5% of installs) |
| Reddit upvotes | 50+ combined |
| HN front page | No (but aim for 50+ points) |
| Reported bugs | <5 critical |

---

## 4. Positioning & Messaging

### Elevator Pitch

"Resp Diff is a Chrome DevTools extension that lets you capture API response bodies with one click and diff any two snapshots side-by-side. No external tools, no dependencies, no leaving the browser."

### Key Differentiators

1. **Lives in DevTools** — not another tab, not another tool
2. **Zero dependencies** — no CDN, no npm, no tracking
3. **Works offline** — no server backend, no account required
4. **Manifest V3** — future-proof, minimal permissions

### Anti-Positioning (what we are NOT)

- NOT a Postman replacement (no request builder, no collections)
- NOT a proxy tool (no request interception or modification)
- NOT a collaboration tool (no sharing, no teams — yet)
- NOT a schema validator (no contract testing)

---

## 5. v1.1 Roadmap (post-launch, based on feedback)

Potential additions based on expected user requests:

1. **Export diff as Markdown** — most requested Pro feature
2. **Snapshot folders** — organize by project/environment
3. **Keyboard shortcuts** — faster workflow
4. **Request filtering** — filter by URL pattern or method
5. **GraphQL-aware diff** — understand query structure
6. **Diff stats summary** — "3 added, 1 removed, 5 changed"

---

## 6. Pricing Execution

### Free Tier Delivery
- Hard-coded limit of 10 snapshots in panel.js
- No account needed, no license key needed

### Pro Tier Delivery (Human action required)
1. Set up Gumroad account (free to create, 10% fee per sale)
2. Create product: "Resp Diff Pro — License Key"
3. Price: $5/month subscription or $40/year
4. Delivery: Auto-email license key on purchase
5. Extension: Add "Enter License Key" field in panel settings
6. Validation: Simple key format check (no server needed for MVP — just key format validation, add server validation later)

**Note:** For MVP, Pro tier is aspirational. Ship the free tier first, gauge demand, then implement Pro if traction warrants the build time.
