# ARCHITECTURE.md

Decisionns, in order. An ADR is never edited after it is accepted; it is superseded.

## The Gate: HW4 rerun

Where should entries live now that they must survive a cleared cache?

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---:|---:|---:|---:|
| Cost to start | 4 | 3 - 12 | 4 - 16 | 5 - 20 |
| Cost to maintain | 3 | 4 - 12 | 3 - 9 | 3 - 9 |
| Time to working | 5 | 3 - 15 | 4 - 20 | 5 - 25 |
| Inspectability | 5 | 5 - 25 | 2 - 10 | 1 - 5 |
| Switching cost | 2 | 4 - 8 | 2 - 4 | 2 - 4 |
| Fit to spec | 4 | 5 - 20 | 3 - 12 | 3 - 12 |
| **Weighted total** | | **92** | **71** | **75** |

The HW3 weights are unchanged. Inspectability and time-to-working remain the highest priorities because the assignment requires me to understand and verify the Worker, while the zero-budget constraint still makes cost important. For switching cost, I scored Build 4 because Session B required learning deployment and wiring the API, but the data remains portable SQL and the frontend has a small fetch boundary. I scored Buy and Delegate 2 because leaving would require replacing vendor-specific storage/authuration and API behavior.

Build wins because it keeps the Worker, SQL schema, validation, and data flow inspectable while meeting the cleared-cache requirement without changing the application's core feature. The totals are a decision aid, not a claim that the other options are impossible.

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** Accepted
/ **Supersedes:** ADR-001

### Context

The browser previously held the entry text in localStorage, so clearing site data or using another browser made the entries disappear. Under this decision, the entry text and the server-created timestamp leave the browser in JSON requests and responses. The requests go to my Cloudflare Worker, and the entry values are stored in Cloudflare D1. Cloudflare may also receive request metadata such as the request time and IP address through its normal infrastructure logs, even though the application does not intentionally store that metadata in the entries table. The crossing is governed by the Cloudflare service terms and account settings. I am accountable for the data the page sends, the Worker code, the database schema, and access configuration; Cloudflare is accountable for operating the Worker and D1 infrastructure under its service terms.

### Decision

Use the supplied Cloudflare Worker as a small API with `GET /entries` and `POST /entries`, and use the attached D1 database as the source of truth. The Worker uses parameter binding for user values, validates POST requests, returns status codes for success and failure, and sends CORS headers so the static page can call it. The page keeps rendering user values with `textContent`, but replaces localStorage reads and writes with fetch requests.

### Alternatives considered

- **Buy:** A hosted backend-as-a-service would reduce deployment code, but it would add vendor-specific configuration and make the trust boundary and implementation less inspectable. Its Gate score was 71.
- **Delegate:** An AI builder could generate and host the backend quickly, but I would have less confidence inspecting its storage, security, and failure behavior, and leaving would still require replacing hosted APIs. Its Gate score was 75.
- **Build:** The Worker + D1 option scored 92 and is the selected choice because it provides durable storage while keeping the crossing and server code small enough to inspect.

### Consequences

Entries now survive a cleared browser cache and can be read by another browser that uses the same deployed Worker. The negative consequences are that offline use is harder, a deployment and database must be maintained, network and CORS failures must be handled, Cloudflare receives the entry data and request metadata, and testing now depends on a remote service rather than only on browser storage. A later multi-user design may also require identity and authorization that this prototype does not provide.

### Revisit trigger

Revisit this decision if the project needs separate entries or permissions for multiple users, private or sensitive data, offline-first behavior, a different data region or retention policy, or costs and Cloudflare terms no longer fit the project. A second user needing their own entries is ADR-003 territory.

---

## ADR-001: Store entries in localStorage

**Status:** Superseded by ADR-002

Title and date: ADR-001: Build the opt-in directory (F-01) by hand - September 12, 2026 Status: Accepted Door / concrete acquisition and execution choice: Build. HW3 supplies a working template app. I adapted its existing behavior by rebranding it as the opt-in directory and adding a matching error message, instead of replacing it with a build from scratch or paying for/delegating an entriely new implementation. Context: F-01 specifies an opt-in directory: employees list themselves as available for a short informal conversation, and interns browse the list. The supplied template already implements the exact load/save/render/opt-out shape F-01 needs. It provides a form that saves an entry and a list that renders it, with delete already behaving like an immediate opt-out. The budget is zero, the deadline is about a week, and the course requires I be able to inspect and explain every line, including the parts I did not originally write. Paying for an existing directory service would cost moeny I do not have and would not natively enforce my specific removal time rule. Fully delegating a rebuild would be faster than adapting the template myself, but my own instectability score for a wholesale agent rewrite is low. I can read and modify the supplied plain JavaScript, but I am not yet confident auditing an entirely new implementation for subtle bugs on my own. Decision: Adapt the supplied template in place. Rebrand its text to describe an opt-in directory and add an error message, keeping its existing load/save/render patter, accessibility attributes, and the simulateFailedSave test harness untouched. Consequences and revisit trigger: This makes the feature fully inspectable by me and lets me match F-01's acceptance criteria directly, at the cost of taking longer to build than an existing tool would and producing a visible simpler interface. The interaction is one-directional by design. However, this prototype does not provide production authentication, multi-user synchronization, manager notifications, scheduling automation, or internship-end enforcement. There is no login yet, anyone using the page can currently do both the "opt in" and "browse" actions, with nothing enforcing that separation. Additionally, there is no system in place to remove intern access once their internship ends. I will need to revisit these to make sure that real accounts enforce who can opt in versus who can only browse and when intern access needs to be revoked. At that point, I will write ADR-002 and mark this ADR as Superseded, not deleted.
