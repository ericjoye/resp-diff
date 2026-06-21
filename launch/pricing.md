# Pricing Strategy — resp-diff

## Model: Freemium (Free + Pro)

### Free Tier — $0

- 10 snapshots at a time
- Side-by-side JSON diff
- Color-coded changes (added/removed/changed)
- Persistent storage across sessions
- Works on all sites

**Goal:** Remove friction to install. 10 snapshots is enough for a developer to experience the value during a debugging session. When they hit the limit, they're already hooked.

### Pro Tier — $5/month or $40/year (33% annual discount)

Everything in Free, plus:

- **Unlimited snapshots** — no cap
- **Export diff** — download comparison as JSON or Markdown
- **Snapshot folders & tags** — organize by project, endpoint, or environment
- **Dark mode panel** — match DevTools dark theme automatically
- **Priority support** — GitHub issue response within 48h

**Why $5/mo:** Developers already pay for tools like Postman ($14/mo), Charles Proxy ($50 one-time), or various SaaS diff tools. $5/mo is an impulse-buy price for a tool used daily. The annual option rewards committed users and improves LTV.

### Rationale

- **No trial period** — free tier IS the trial. Developers don't need a credit card to experience value.
- **No team/enterprise tier yet** — wait until there's demand. Don't build pricing for a market that doesn't exist.
- **No lifetime deal** — recurring revenue funds maintenance. AppSumo deals can come later if traction warrants.

### Conversion Expectations

- Industry average for dev tools: 2-5% free-to-paid conversion
- At 1,000 free users: ~20-50 Pro subscribers = $100-250/mo
- At 10,000 free users: ~200-500 Pro subscribers = $1,000-2,500/mo

### Payment Processing

- Chrome Web Store does NOT handle payments for extensions (only for in-app purchases via Chrome Web Store Payments API)
- **Pro tier delivery:** License key system — user pays via Gumroad/Paddle, receives a key, enters it in the extension
- Alternative: Link to a simple landing page with payment, then email license key
- **Human action needed:** Set up Gumroad or Paddle account, create product, configure license key delivery
