# TOOLS.md

The ledger of Trust Boundary crossings. One row per external service this
repository depends on. Read by the agent on every task, so keep it short: a
service not in use does not belong here.

Never put a credential in this file. A key, token, or password anywhere in
the repository is graded as a security failure regardless of the rest.

Each crossing statement answers three questions in one first-person sentence:
what crosses, to whom, and who is accountable.

| Service | Trusted with | Credentials live | Crossing statement | Switching cost |
|---|---|---|---|---|
| Cloudflare Workers + D1 | Every entry a user types; request metadata such as IP and timestamp that Cloudflare may log | Cloudflare account and local wrangler authentication | I send entry text and request data to Cloudflare, and I am accountable for what my Worker stores while Cloudflare operates the infrastructure under its service terms. | Medium: export D1, then rewrite and deploy the API elsewhere |
| GitHub + Codespaces | Source, commit history, and the devcontainer while I develop | GitHub account authentication | I send this repository and development activity to GitHub, and I am accountable for the code and data I commit there. | Medium: clone the repository and move development to another host |
| GitHub Copilot | Repository files and prompts used to generate suggestions | GitHub account authentication | I send relevant repository context to GitHub Copilot for suggestions, and I am accountable for reviewing what I accept. | Low: stop using Copilot and continue with the repository locally |
| wrangler (npm) | Project configuration, deployment commands, and Cloudflare API requests when I run it | Local wrangler authentication managed by Cloudflare tooling | I send deployment configuration through wrangler to Cloudflare, and I am accountable for the commands and configuration I run. | Low: replace the CLI workflow with another deployment client |

## Revisit triggers

- A new service is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.
