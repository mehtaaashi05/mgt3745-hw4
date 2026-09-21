# ARCHITECTURE.md

Status: ACTIVE in Module 3.

## Gate

Hard Constraints:
- Zero budget
- Around one week to a working page
- Must run as a static client-side page

Feature under the gate: F-01, the opt-in directory. Employees opt themselves in with a name, team, and a short note. Interns can browse the list to find someone to ask for an informal conversation.

1/3/5 anchors:
- Cost to start - 5: free and usable today. 3: some setup time or a small one-time cost. 1: requires payment or a lengthy setup before anything works
- Cost to maintain - 5: no ongoing cost or effort once built. 3: occasional small upkeep. 1: an ongoing subscription or heavy recurring maintenance burden
- Time to working - 5: working today. 3: working within a few days. 1: working takes longer than the assignment window
- Inspectability - 5: I can read and personally verify every line. 3: I can read most of it with real effort. 1: it is a black box I cannot verify myself
- Switching cost - 5: trivial to replace or move away from later. 3: moderate rework needed to switch. 1: heavy lock-in, hard to leave
- Fit to spec - 5: matches my EARS acceptance criteria exactly. 3: partial match, needs a workaround. 1: poor match - the spec would have to change to fit the tool


| Criterion | Weight | Hand-built option | Existing-service option | AI-assisted build |
|---|---:|---:|---:|---:|
| Cost to start | 4|3- 12|1- 4|5- 20 |
| Cost to maintain |3| 5 - 15|1 - 3|5- 15 |
| Time to working | 5|3 - 15|4 - 20|5 - 25 |
| Inspectability | 5|5 - 25|1 - 5|2 - 10|
| Switching cost | 2|5 - 10|2 - 4|3 - 6|
| Fit to spec | 4|5 - 20|2 - 8|4 - 16|
| Total | |97|44|92|

Weight Rationale: Inspectability and time-to-working are tied for the top weight (5) because the deadline is real and the course specifically grades whether I can explain what I built. Cost to start has weight 4 because the project has a zero budget. Fit to spec has weight 4 because the feature must match the acceptance criteria. Cost to maintain has weight 3 because this is a small class prototype. Switching cost has weight 2 because it matters, but the prototype is intentionally small.

Buy fit note: F-01 is a directory with opt-in/opt-out, which off-the-shelf tools could technically approximate, but none would natively enforce "removed from intern-visible results within 1 minute" without configuration and vendor-specific behavior.

Sensitivity check: If inspectability's weight drops from 5 to 2 (if I assume I become confident auditing AI-generated code), the totals become Build 82, Buy 41, Delegate 86. Build still is the big[...]

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
**Supersedes:** ADR-001

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

Title and date: ADR-001: Build the opt-in directory (F-01) by hand - September 12, 2026
Status: Accepted
Door / concrete acquisition and execution choice: Build. HW3 supplies a working template app. I adapted its existing behavior by rebranding it as the opt-in directory and adding a matching error message, keeping the supplied structure.
Context: F-01 specifies an opt-in directory: employees list themselves as available for a short informal conversation, and interns browse the list. The supplied template already implements the expected load/save/render pattern.
Decision: Adapt the supplied template in place. Rebrand its text to describe an opt-in directory and add an error message, keeping its existing load/save/render pattern, accessibility attributes, and client-side storage.
Consequences and revisit trigger: This makes the feature fully inspectable by me and lets me match F-01's acceptance criteria directly, at the cost of taking longer to build than an existing tool and limiting persistence to one browser. Revisit when entries must survive a cleared cache or be shared between clients.
