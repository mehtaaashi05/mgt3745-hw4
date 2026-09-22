# Features and specification

## Context

An intern on one team becomes curious about another and wants firsthand information before deciding whether to pursue a move, without signaling dissatisfaction or requesting a transfer.

## Users

Profiles and evidence are documented in [USERS.md](USERS.md): PROFILE-01 (The Hesitant Explorer), who is curious about another team but has not acted yet, and PROFILE-02 (The Proactive Outreacher), who shows that a receptive contact can be reached without an existing connection.

## Scope

The project covers requesting and completing one short, informal, no-commitment conversation with someone from a different team, visible to the intern's current manager and framed as standard program participation with an explicit no-standing-impact guarantee.

It does not cover formal transfer or rotation applications, scheduling automation beyond one request and response, performance or return-offer decisions, or full-time employees. In this HW4 implementation, the boundary is the shared opt-in directory: adding, listing, validating, and removing fictional, non-sensitive entries.


## Features

| Feature ID | Feature | Kano hypothesis | Segment / date | Evidence and reasoning | Status |
|---|---|---|---|---|---|
| F-01 | Opt-in directory of employees willing to have a 15-20 minute informal conversation with an intern from another team | Must-be | Both segments - Sept 08 | INT-02 succeeded via self-arranged cold outreach; INT-01 confirmed no formal way exists to find who is approachable. | Built (HW3), server-backed (HW4) |
| F-02 | Explicit information-only and no-commitment framing on every conversation request | Performance | Hesitant Explorer - Sept 08 | INT-01 said “tell me about your team” felt less risky than “I want to move.” | Deferred beyond the HW4 directory boundary |
| F-03 | Current manager notification framed as standard program participation with no-standing-impact guarantee | Performance | Hesitant Explorer - Sept 08 | INT-02's manager reacted positively, challenging the assumption that visibility itself is the risk. | Deferred; requires organizational workflow and authentication |
| F-04 | Static content pages of typical work per line of business | Indifferent | Both segments - Sept 08 | INT-02 said shadowing, not reading, confirmed interest. | Not selected |
| F-05 | Formal application required just to start an exploratory conversation | Reverse | Both segments - Sept 08 | Both interviews showed that the value came from low-commitment, informal contact. | Rejected because it adds friction |
| F-06 | Anonymized visibility into how many interns completed exploratory conversations | Attractive | Both segments - Sept 08 | This would target the perceived-versus-actual risk gap by normalizing exploration. | Deferred |

## Selected feature: F-01 opt-in directory

For HW3, this project implements F-01: an opt-in directory of employees willing to have a short, informal conversation with an intern from another team. An employee can add a directory entry and opt out later. An intern can view opted-in employees. The request is informational and non-committal and does not create a formal transfer request.

The discovery insight guiding this feature is that reputational risk is perceived as significantly greater than the cost actually enforced. The prototype therefore emphasizes voluntary participation, revocable opt-in status, and clear information-only framing. The implementation boundary is documented in [ARCHITECTURE.md](ARCHITECTURE.md).

## Behavior

1. When the directory opens, the system displays employees who have opted in.
2. When an employee submits an entry, the system validates it before saving.
3. If the entry is invalid, the page shows a validation message and preserves the input.
4. If saving fails, the page shows an error and leaves the current directory unchanged.
5. If saving succeeds, the page adds the entry, clears the input, and announces success.
6. When an employee opts out, the system removes the entry only after the updated state is saved successfully.
7. If an opt-out save fails, the page shows an error and keeps the employee visible.

## Constraints

- Only current employees and interns may access the directory; production use would require existing internal authentication.
- An employee's opt-in status must be self-managed and revocable at any time.
- The organization must make clear that a conversation is not a formal transfer request and carries no negative standing impact.
- The system must retain no conversation content, only the fact that a request was made and its status.










## Acceptance criteria (EARS)

- WHEN a request is submitted, THE SYSTEM SHALL confirm within 2 seconds.
- WHEN an intern completes two conversations, THE SYSTEM SHALL show the manager was notified of both and no negative flag was recorded.
- WHEN an employee opts out, THE SYSTEM SHALL remove them from results within 1 minute.
- WHEN the internship ends, THE SYSTEM SHALL disable new requests by the next day.
- WHEN an exploratory request completes, THE SYSTEM SHALL NOT create a transfer request.


## Verification

Walk every statement against the deployed page. PASS, FAIL, CANNOT TEST YET, or DEFERRED, with a reason.

HW4 validation rule: IF entry text is longer than 200 characters, THEN THE SYSTEM SHALL reject it and say that the maximum is 200 characters.

| Statement | HW3 verdict | HW4 verdict | Reason |
|---|---|---|---|
| Confirm a submitted conversation request within 2 seconds | PASS | PASS | The Live Server page displayed “Conversation request sent. This is informational and non-committal.” immediately after the request button was clicked. |
| Show manager notification and no negative flag after two conversations | CANNOT TEST YET | CANNOT TEST YET | Manager notification and performance-status tracking are outside this implementation. |
| Remove an opted-out employee from results within 1 minute | PASS | PASS | The page removes the entry after the successful save in HW3; the HW4 page waits for DELETE success and refreshes immediately. |
| Disable new requests by the day after an internship ends | DEFERRED | DEFERRED | The prototype has no identity or internship-lifecycle system; see the architecture decision. |
| Do not create a transfer request when an exploratory request completes | CANNOT TEST YET | PASS | The tested request interaction only displays the informational confirmation; it makes no transfer-request call and the Worker has no transfer-request route. |
| Return entries in order | PASS | PASS | Deployed `GET /entries` returned entries ordered by their creation IDs. |
| Store valid entry | PASS | PASS | Deployed `POST /entries` returned 201 and a follow-up GET returned the entry. |
| Reject missing text | *?* | PASS | Deployed POST with missing text returned 400 and `text required`; the page shows the response. |
| Survive cleared cache | — | PASS | This is a new HW4 requirement, not an HW3 acceptance statement. The entry remained available from the deployed API after browser site data was cleared and the page was reloaded. |
| Server unreachable | | CANNOT TEST YET | The page catches fetch failures and shows an error, but an outage still needs to be simulated. |
| Server returns 500 | | CANNOT TEST YET | The page handles a non-success response, but the deployed 500 path still needs to be exercised. |
| Server returns 400 for overlong text | | PASS | Deployed POST with more than 200 characters returned 400 and named the 200-character limit. |
| Second client writes to the same table | | DEFERRED | Shared storage is supported, but per-user identity and authorization are outside this HW4 scope; see ADR-002. |


## AI assistance

I used AI to compare this entry with the assignment rubric and check that the HW4 EARS requirements, verification table, and implementation boundary were documented. I reviewed the resulting changes against the repository and tested the Worker and app syntax separately.

## Related files

- [Project framing](PROJECT.md)
- [User profiles and evidence](USERS.md)
- [Architecture decision and ADR-002](ARCHITECTURE.md)
- [Coding standards](STANDARDS.md)
- [Agent instructions](CLAUDE.md)
- [Project README](../README.md)

