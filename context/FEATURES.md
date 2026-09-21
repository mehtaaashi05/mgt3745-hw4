# FEATURES.md

The living feature table and the verification record. Copy in from HW3 and extend.

## Features

| Feature | Kano | Status |
|---|---|---|
| *Save and list entries* | *Basic* | *Built (HW3), server-backed (HW4)* |
| *...* | | |

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
| Return entries in order | PASS | CANNOT TEST YET | The Worker query orders results by the database ID; verify against the deployed Worker after deployment. |
| Store valid entry | PASS | CANNOT TEST YET | The POST endpoint uses D1 and returns 201; verify with a valid deployed request. |
| Reject missing text | *?* | CANNOT TEST YET | The browser and Worker reject missing text with a visible reason; test the deployed 400 path. |
| Survive cleared cache | CANNOT TEST YET | CANNOT TEST YET | Test after deployment by adding an entry, clearing site data or opening a private window, and reloading. |
| Server unreachable | | CANNOT TEST YET | The page catches fetch failures and shows an error, but an outage still needs to be simulated. |
| Server returns 500 | | CANNOT TEST YET | The page handles a non-success response, but the deployed 500 path still needs to be exercised. |
| Server returns 400 for overlong text | | CANNOT TEST YET | The Worker rejects text over 200 characters; test the validation rule against the deployed endpoint. |
| Second client writes to the same table | | DEFERRED | Shared storage is supported, but per-user identity and authorization are outside this HW4 scope; see ADR-002. |

