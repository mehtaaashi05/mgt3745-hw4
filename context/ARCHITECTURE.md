# ARCHITECTURE.md

Status: ACTIVE in Module 3.

## Gate

Hard Constraints:
- Zero budget
- Around one week to a working page
- Must run as a static client-side page

Feature under the gate: F-01, the opt-in directory. Employees opt themselves in with a name, team, and a short note. Interns can browse the list to find someone to ask for an informal conversation. This is the Must-be feature in the Kano table, with the strongest evidence out of the six.

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
| Time to working | 5|3 - 15|4 - 20|5- 25 |
| Inspectability | 5|5 - 25|1 - 5|2 - 10|
| Switching cost | 2|5 - 10|2 - 4|3 - 6|
| Fit to spec | 4|5 - 20|2 - 8|4 - 16|
| Total | |97|44|92|

Weight Rationale: Inspectability and time-to-working are tied for the top weight (5) because the deadline is real and the course specifically grades whether I can explain what I built. Cost to start and fit to spec are next (4) because the budget is zero and F-01's acceptance criteria are already written and specific. Switching cost is weighted lowest (2) because a system like this does not exist already at the company and being locked in later matters far less than it would for a production system. 

Buy fit note: F-01 is a directory with opt-in/opt-out, which off-the-shelf tools could technically approximate, but none would natively enforce "removed from intern-visible results within 1 minute of opting out" or enforcing the informal-conversation only framing baked into the spec, hece the low fit-to-spec score.

Sensitivity check: If inspectability's weight drops from 5 to 2 (if I assume I become confident auditing AI-generated code), the totals become Build 82, Buy 41, Delegate 86. Build still is the biggest, but only barely, which shows the decision is fairly robust but hinges specifically on how much inspectability is weighted, not on any other criterion being lopsided. 

## ADR-001

Title and date: ADR-001: Build the opt-in directory (F-01) by hand - September 12, 2026
Status: Accepted
Door / concrete acquisition and execution choice: Build. HW3 supplies a working template app. I adapted its existing behavior by rebranding it as the opt-in directory and adding a matching error message, instead of replacing it with a build from scratch or paying for/delegating an entriely new implementation.
Context: F-01 specifies an opt-in directory: employees list themselves as available for a short informal conversation, and interns browse the list. The supplied template already implements the exact load/save/render/opt-out shape F-01 needs. It provides a form that saves an entry and a list that renders it, with delete already behaving like an immediate opt-out. The budget is zero, the deadline is about a week, and the course requires I be able to inspect and explain every line, including the parts I did not originally write. Paying for an existing directory service would cost moeny I do not have and would not natively enforce my specific removal time rule. Fully delegating a rebuild would be faster than adapting the template myself, but my own instectability score for a wholesale agent rewrite is low. I can read and modify the supplied plain JavaScript, but I am not yet confident auditing an entirely new implementation for subtle bugs on my own. 
Decision: Adapt the supplied template in place. Rebrand its text to describe an opt-in directory and add an error message, keeping its existing load/save/render patter, accessibility attributes, and the simulateFailedSave test harness untouched. 
Consequences and revisit trigger: This makes the feature fully inspectable by me and lets me match F-01's acceptance criteria directly, at the cost of taking longer to build than an existing tool would and producing a visible simpler interface. The interaction is one-directional by design. However, this prototype does not provide production authentication, multi-user synchronization, manager notifications, scheduling automation, or internship-end enforcement. There is no login yet, anyone using the page can currently do both the "opt in" and "browse" actions, with nothing enforcing that separation. Additionally, there is no system in place to remove intern access once their internship ends. I will need to revisit these to make sure that real accounts enforce who can opt in versus who can only browse and when intern access needs to be revoked. At that point, I will write ADR-002 and mark this ADR as Superseded, not deleted. 

Keep superseded ADRs. The pedagogical browser build can coexist with a different architecture recommendation; explain the distinction.

## The Gate: HW4 rerun

Where should entries live now that they must survive a cleared cache?

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---|---|---|---|
| Cost to start | *?* | | | |
| Cost to maintain | *?* | | | |
| Time to working | *?* | | | |
| Inspectability | *?* | | | |
| Switching cost | *?* | *scored from Session B experience* | | |
| Fit to spec | *?* | | | |
| **Weighted total** | | | | |

*Keep your HW3 weights unless you can say in one sentence why one changed.*

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** *Proposed / Accepted*
**Supersedes:** ADR-001

### Context

*What data leaves the browser, to which vendor, under what terms, and who is accountable. All four, or the decision is not recorded.*

### Decision

*...*

### Alternatives considered

*Buy and Delegate from the Gate above, with the score and one sentence each.*

### Consequences

*At least one thing that got harder: offline use, testing, cost ceiling, a stranger's data in your table.*

### Revisit trigger

*When would this decision be wrong? "When a second user needs their own entries" is ADR-003 waiting to happen.*

---

## ADR-001: Store entries in localStorage

**Status:** Superseded by ADR-002

*Paste your HW3 ADR-001 here, unedited. The reasoning was true on September 10; the record should show that it was.*
