# FEATURES.md

The living feature table and the verification record. Copy in from HW3 and extend.

## Features

| Feature | Kano | Status |
|---|---|---|
| Save and list entries | Basic | Built (HW3), server-backed (HW4) |
| Reject invalid entries | Basic | Built (HW4) |

## Acceptance criteria (EARS)

- THE SYSTEM SHALL return all entries in creation order.
- WHEN a valid entry is submitted, THE SYSTEM SHALL store it and confirm.
- IF the entry text is missing, THEN THE SYSTEM SHALL reject it and say why.
- IF the server cannot be reached, THEN THE SYSTEM SHALL tell the user on the page.
- IF entry text is longer than 200 characters, THEN THE SYSTEM SHALL reject it and say that the maximum is 200 characters.

The Worker implements the overlong-entry rule with a 400 response before writing to D1. The browser checks the same limit before sending the request so the user receives immediate feedback.

## Verification

Walk every statement against the deployed page. PASS, FAIL, CANNOT TEST YET, or DEFERRED, with a reason.

| Statement | HW3 verdict | HW4 verdict | Reason |
|---|---|---|---|
| Return entries in order | PASS | PASS | Deployed GET /entries returned entries ordered by their creation IDs. |
| Store valid entry | PASS | PASS | Deployed POST /entries returned 201 and a follow-up GET returned the entry. |
| Reject missing text | *?* | PASS | Deployed POST /entries with missing text returned 400 and `text required`; the page shows the response. |
| Survive cleared cache | CANNOT TEST YET | PASS | The entry remained available from the deployed API after browser site data was cleared and the page was reloaded. |
| Server unreachable | | CANNOT TEST YET | The page catches fetch failures and shows an error, but an outage still needs to be simulated. |
| Server returns 500 | | CANNOT TEST YET | The page handles a non-success response, but the deployed 500 path still needs to be exercised. |
| Server returns 400 for overlong text | | PASS | Deployed POST /entries with more than 200 characters returned 400 and named the 200-character limit. |
| Second client writes to the same table | | DEFERRED | Shared storage is supported, but per-user identity and authorization are outside this HW4 scope; see ADR-002. |

