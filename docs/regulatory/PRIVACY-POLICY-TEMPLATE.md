# pondex — Privacy Policy Template

_Status: DRAFT — not published. Required before Phase 2 launch (any account creation)._
_Must be reviewed by a GDPR-qualified lawyer before publishing._
_Last updated: 2026-07-16_

---

**⚠ This is a working template, not a final legal document. Do not publish without legal review.**

---

# Privacy Policy

**Effective date:** [DATE]
**Last updated:** [DATE]
**Controller:** [Legal entity name], [Address], [Country]
**Contact:** privacy@[domain]

---

## 1. Who We Are

pondex ("we", "us", "our") is a stock research tool operated by [Legal entity]. We provide informational analysis of publicly traded securities. We are not a financial adviser and do not provide investment advice.

---

## 2. What Data We Collect

### 2.1 Account Data (Phase 2+)
When you create an account:
- Email address
- Password (stored as bcrypt hash — we never store plaintext passwords)
- Authentication provider token (if Google OAuth used)
- Account creation timestamp

### 2.2 Profile Data (Phase 2+)
Data you provide voluntarily:
- Investor strategy preference (value / growth / dividend / momentum)
- Risk tolerance (low / medium / high)
- Investment horizon (optional)

### 2.3 Usage Data (Phase 2+)
Automatically collected when you use the app:
- Tickers searched and analysed
- Verdict scores generated (stored for your history)
- Watchlist and portfolio holdings you add
- Date and time of actions

### 2.4 Payment Data (Phase 2+ — Pro tier)
Processed by Stripe (we never see your card number):
- Stripe customer ID (reference only)
- Subscription status (free / pro)
- Billing history (via Stripe)

### 2.5 Technical Data
- IP address (logged by hosting infrastructure — Supabase / Railway)
- Browser type and version (standard HTTP headers)
- We do not use tracking cookies or third-party analytics in Phase 1. [Update this when analytics are added.]

---

## 3. Legal Basis for Processing (GDPR Art. 6)

| Data | Legal Basis | Details |
|---|---|---|
| Account data | Contract (Art. 6(1)(b)) | Necessary to provide the service |
| Profile data | Consent (Art. 6(1)(a)) | You provide this voluntarily; can be changed or deleted |
| Usage data | Legitimate interest (Art. 6(1)(f)) | To provide and improve the service; to enforce free-tier limits |
| Payment data | Contract (Art. 6(1)(b)) | Necessary to process subscription payments |
| Technical data | Legitimate interest (Art. 6(1)(f)) | Security, fraud prevention, service stability |

---

## 4. How We Use Your Data

- **To provide the service:** Generate verdicts, maintain your watchlist and portfolio, enforce free-tier limits.
- **To send you communications:** Subscription confirmations, weekly digest emails (if opted in), security alerts.
- **To improve the product:** Aggregate, anonymised usage patterns (no individual tracking).
- **To comply with legal obligations:** Retain transaction records as required by applicable law.

We do not:
- Sell your data to third parties
- Use your data for advertising
- Share your portfolio or watchlist data with any third party
- Use your data to train AI models without explicit consent

---

## 5. Data Sharing — Sub-Processors

We share data with the following processors under GDPR Art. 28 Data Processing Agreements:

| Processor | Purpose | Location | DPA |
|---|---|---|---|
| Supabase | Database, authentication | EU (choose EU region) | [Link to Supabase DPA] |
| Railway | Backend hosting | US (assess Schrems II) | [Link to Railway DPA] |
| Stripe | Payment processing | US/EU | [Stripe DPA included in ToS] |
| Groq | AI inference (Llama model) | US | [Link to Groq DPA] |

**Schrems II note (EU-US transfers):** For processors hosted in the US, we rely on Standard Contractual Clauses (SCCs) as the transfer mechanism under GDPR Art. 46(2)(c). [Verify this is in place for each processor before publishing.]

---

## 6. Data Retention

| Data | Retention Period | Reason |
|---|---|---|
| Account data | Until account deletion + 30 days | Grace period for recovery |
| Verdict history | Until account deletion | Core product feature |
| Portfolio/watchlist | Until deleted by user or account deletion | User-controlled |
| Payment records | 7 years | Legal obligation (EU accounting law) |
| Technical/access logs | 90 days | Security / fraud detection |

---

## 7. Your Rights (GDPR Art. 15–22)

As a user in the EU/EEA, you have the right to:

| Right | How to exercise |
|---|---|
| **Access** (Art. 15) — see all data we hold about you | Email privacy@[domain] |
| **Rectification** (Art. 16) — correct inaccurate data | Edit in Settings, or email us |
| **Erasure** (Art. 17) — delete your account and all data | Settings → Delete Account, or email us |
| **Restriction** (Art. 18) — limit how we process your data | Email privacy@[domain] |
| **Portability** (Art. 20) — receive your data in machine-readable format | Email privacy@[domain] — we provide JSON export |
| **Object** (Art. 21) — object to processing based on legitimate interest | Email privacy@[domain] |
| **Withdraw consent** — where processing is based on consent | Settings → Privacy, or email us |

**Response time:** We respond to all rights requests within 30 days (GDPR Art. 12(3)).

**Right to lodge a complaint:** You may lodge a complaint with your national data protection authority. For Germany: Bundesbeauftragter für den Datenschutz (BfDI). For the EU generally: your local DPA as listed at edpb.europa.eu.

---

## 8. Account Deletion

You can delete your account at any time from Settings → Account → Delete Account.

On deletion:
- All personal data is permanently deleted within 30 days
- Payment records are retained for 7 years (legal obligation)
- Anonymised, aggregated data (e.g. "X verdicts generated in July 2026") may be retained indefinitely

---

## 9. Cookies

**Phase 1 (Landing Page):** We use no tracking cookies. We use a single session cookie for authentication (strictly necessary — no consent required).

**Phase 2+ (if analytics added):** [Update this section when any analytics tool is added. Consent banner required before setting non-essential cookies.]

---

## 10. Children

pondex is not directed at children under 16. We do not knowingly collect data from children under 16. If you believe a child has provided us with personal data, contact privacy@[domain] and we will delete it.

---

## 11. Changes to This Policy

We will notify you of material changes by email (if you have an account) and by updating the "Last updated" date above. Continued use of the service after notification constitutes acceptance.

---

## 12. Contact

**Data Controller:**
[Legal entity name]
[Address]
[Country]
Email: privacy@[domain]

**For GDPR requests specifically:** privacy@[domain] — subject line "GDPR Request"

---

_[LEGAL REVIEW CHECKLIST — remove before publishing]:_
- _[ ] Correct legal entity name and address_
- _[ ] Confirm Supabase EU region is selected_
- _[ ] Confirm SCCs in place for US processors_
- _[ ] Confirm Groq DPA signed_
- _[ ] Confirm right-to-erasure mechanism works in app_
- _[ ] Confirm JSON data export works_
- _[ ] Update cookie section if any analytics added_
- _[ ] Have a GDPR-qualified lawyer review before publishing_
