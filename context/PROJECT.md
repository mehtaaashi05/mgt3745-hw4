# PROJECT.md

Status: ACTIVE.

An intern on one team becomes curious about another and wants firsthand information before deciding whether to pursue a move, without signaling dissatisfaction or requesting a transfer. The scope covers requesting and completing one short, informal, no-commitment conversation with someone from a different team, visible to the intern's current manager and framed as standard program participation with an explicit no-standing-impact guarantee. 

## Problem statement

Interns often want firsthand information about another team but hesitate to ask
because curiosity can look like dissatisfaction or a transfer request. This
directory gives them a low-commitment way to find an employee who has opted in
to a short conversation, while keeping the example data fictional and
non-sensitive.

## Who it is for

Primary users are hesitant interns exploring another team's work. Secondary
users are employees willing to describe their work and managers who need the
activity framed as ordinary development rather than a transfer signal.

## Scope

In: adding and listing a short opt-in directory entry. Out: messaging,
identity verification, transfer requests, and manager approvals. Deferred:
per-user accounts, private entries, and removal workflows.

## Constraints

The project is a one-week static page plus a small Cloudflare Worker and D1
database, with a zero budget. It stores only fictional, non-sensitive entry
text and server timestamps. The browser-to-Cloudflare crossing is recorded in
[TOOLS.md](TOOLS.md) and ADR-002.
