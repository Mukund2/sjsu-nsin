# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in `sjsunsin.org`, please report it
responsibly. **Do not open a public GitHub issue.**

### Preferred channels

1. Email: `security@sjsunsin.org`
2. LinkedIn: https://www.linkedin.com/company/sjsu-nsin/
3. Machine-readable contact: https://sjsunsin.org/.well-known/security.txt

### What to include

- A clear description of the vulnerability
- Steps to reproduce, ideally with a minimal proof of concept
- The affected URL(s), browser, and any relevant request/response data
- Your name or handle (optional) for the acknowledgments list

### Response timeline

- We aim to acknowledge reports within **2 business days**
- We aim to triage and respond with a remediation plan within **5 business days**
- Severity is assessed using CVSS v3.1

### Scope

In scope:

- Stored or reflected XSS in `sjsunsin.org` pages
- Subdomain or domain takeover of `sjsunsin.org` or `www.sjsunsin.org`
- Source-code vulnerabilities in this repository
- Supply-chain risks in declared `package.json` dependencies
- Build / CI workflow compromise paths
- Sensitive information disclosure in committed code

Out of scope:

- Volumetric DDoS reports (handled upstream)
- Reports about lack of rate-limiting on a static site
- Self-XSS that requires the victim to paste content into devtools
- Reports from automated scanners without a working PoC
- Missing security headers on third-party assets we do not control
- Best-practice notices without demonstrated impact
- Reports from `archive.org` cached versions

### Safe harbor

We will not pursue or support legal action against researchers who:

- Act in good faith and avoid privacy violations, destruction of data, and
  interruption or degradation of our services
- Only interact with accounts they own or with explicit permission of the
  account holder
- Give us a reasonable time to investigate and remediate before public
  disclosure (default: 90 days)

Thank you for helping keep our community and partners safe.
