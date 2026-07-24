# ADR-012: Stripe as Payment Provider

**Date:** 2026-07-24
**Status:** Accepted
**Applies to:** Phase E (Pro Tier)

---

## Decision

Use **Stripe** as the payment provider for pondex_ Pro tier.

- Product: Stripe Billing (recurring subscriptions)
- Integration: Stripe Checkout (hosted page, not custom Elements)
- Price points: €4.99/month | €49.99/year
- Region: EU-compliant (Stripe EU entity, VAT handling built-in)

---

## Context

Phase E requires payment infrastructure for the Pro tier upgrade flow. Decision criteria:

| Criterion | Stripe | Paddle | LemonSqueezy | PayPal |
|---|---|---|---|---|
| EU VAT handling | ✅ Manual (Stripe Tax) | ✅ Merchant of Record | ✅ Merchant of Record | ⚠️ Limited |
| Setup complexity | Medium | Low | Low | Low |
| Subscription management | ✅ Excellent | ✅ Good | ✅ Good | ❌ Poor |
| Developer experience | ✅ Best-in-class | ✅ Good | ✅ Good | ❌ Poor |
| Free until first payment | ✅ | ✅ | ✅ | ✅ |
| Webhook reliability | ✅ | ✅ | ✅ | ⚠️ |
| Portfolio fit (solo founder) | ✅ | ✅✅ | ✅✅ | ❌ |

**Note:** Paddle and LemonSqueezy are Merchant of Record providers — they handle all EU VAT automatically. Stripe requires manual Stripe Tax setup. For a solo founder, **LemonSqueezy or Paddle may be simpler** for EU VAT compliance. Stripe chosen for developer tooling quality and future flexibility. Revisit before Phase E if regulatory complexity is a concern.

---

## Product Model

```
Stripe Products:
  pondex_ Pro — Monthly
    Price: €4.99/month (EUR)
    Billing: monthly, recurring
    Trial: 7-day free trial

  pondex_ Pro — Yearly
    Price: €49.99/year (EUR)
    Billing: annual, recurring
    Trial: 7-day free trial
    Savings: ~17% vs monthly

Stripe Webhooks to handle:
  checkout.session.completed    → activate Pro in Supabase
  customer.subscription.updated → update plan in Supabase
  customer.subscription.deleted → downgrade to Free in Supabase
  invoice.payment_failed        → notify user, grace period
```

---

## Integration Flow

```
User on Free tier → hits Free Tier Gate (2nd verdict today)
    ↓
Upgrade Modal shown
    ↓
Klick "Upgrade to Pro"
    ↓
Stripe Checkout (hosted page, redirect)
  - Pre-filled email from Supabase auth
  - Monthly/Yearly toggle
  - 7-day trial clearly displayed
  - Stripe Tax handles EU VAT automatically
    ↓
Stripe webhook → checkout.session.completed
    ↓
Railway backend receives webhook
    ↓
UPDATE profiles SET plan='pro', plan_expires_at=... WHERE id=...
    ↓
User redirected back to /app with Pro active
```

---

## EU Consumer Protection Requirements

Before Phase E launch, these must be implemented:

1. **Pre-payment disclaimer checkbox** (EU Consumer Rights Directive 2011/83/EU):
   ```
   [ ] I understand that pondex_ is a research tool and does not provide
       investment advice. I confirm I am purchasing a software subscription.
   ```
   Button disabled until checked. Must appear before Stripe Checkout redirect.

2. **14-day withdrawal right** (EU): Include in Terms of Service. Stripe Checkout
   supports automatic refund within 14 days via Stripe dashboard.

3. **Auto-renewal disclosure**: Stripe Checkout shows this automatically, but also
   required in the pre-checkout modal copy: "Renews automatically. Cancel anytime."

4. **VAT display**: Stripe Tax must be enabled. Prices shown as €4.99 incl. VAT
   (or excl. VAT + VAT line item — confirm with legal before launch).

5. **Subscription management**: Users must be able to cancel from the app
   (not just via email). Stripe Customer Portal handles this — embed link in
   `/app/account` page.

---

## Environment Variables (Railway)

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_YEARLY=price_...
STRIPE_CUSTOMER_PORTAL_URL=https://billing.stripe.com/p/...
```

---

## Consequences

- **Positive:** Best-in-class webhook reliability and developer docs
- **Positive:** Stripe Tax handles EU VAT automatically (enable before first charge)
- **Positive:** Stripe Customer Portal provides subscription management UI for free
- **Negative:** Stripe is not a Merchant of Record — pondex_ is responsible for VAT registration if sales exceed thresholds in multiple EU countries (mitigated by Stripe Tax)
- **Negative:** 2.9% + €0.25 per transaction fee reduces margin on €4.99/month (net ~€4.59 per payment)
- **Risk:** If EU VAT complexity is too high for solo founder, migrate to LemonSqueezy before Phase E launch
