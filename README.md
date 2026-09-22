# Entries: Data Leaves the Browser

This HW4 version moves the opt-in directory from browser-only storage to a
deployed Cloudflare Worker backed by D1.

## What

HW3 repository: [mgt3745-hw3](https://github.com/mehtaaashi05/mgt3745-hw3)

The opt-in directory helps interns find employees willing to have a short,
informal conversation about another team, without turning curiosity into a
formal transfer request. It serves hesitant explorers and proactive
outreachers described in [PROJECT.md](context/PROJECT.md) and
[FEATURES.md](context/FEATURES.md). Entries now live in Cloudflare D1 behind
the deployed Worker so they survive cleared browser data and are available to
another client, as recorded in ADR-002.

## See It Work
The deployed endpoint returned the same entry after the browser's site data
was cleared and the page was loaded again.

Entry in Incognito Mode:

![See it work](docs/See%20it%20Work.png)

```mermaid
flowchart LR
  A[Page loads] --> B[GET /entries]
  B --> C[render]
  D[User submits] --> E[POST /entries]
  E -->|201| B
  E -->|400| F[showError]
  B -->|network fails| F
```

## How to Run

Deployed Worker: `https://mgt3745-hw4.mgt3745-hw4.workers.dev/`
API: `https://mgt3745-hw4.mgt3745-hw4.workers.dev/entries`

From a fresh Codespace:

1. Open the repository in a Codespace. The devcontainer installs xdg-utils and runs `npm install`.
2. `npx wrangler login --device`, then follow [docs/SESSION_B_COMMANDS.md](docs/SESSION_B_COMMANDS.md)
   to create the database, run the schema, and deploy.
3. Paste the deployed URL into `app.js` as `API`.
4. Right-click `index.html`, choose **Open with Live Server**.

To run the Worker locally instead: `npm run dev` (port 8787, local D1 emulator).

## Status

| Feature | EARS statement | Verdict |
|---|---|---|
| Save an entry | WHEN a valid entry is submitted, THE SYSTEM SHALL store it | PASS |
| Reject empty entry | IF text is missing, THEN THE SYSTEM SHALL reject with a reason | PASS |
| Survive cleared cache | THE SYSTEM SHALL return stored entries on any device | PASS |
| Network down | IF the server is unreachable, THE SYSTEM SHALL tell the user | CANNOT TEST YET |
| Two clients, one table | WHEN two clients write, THE SYSTEM SHALL preserve both valid entries | DEFERRED (ADR-002) |

Full verification table lives in [FEATURES.md](context/FEATURES.md).

## Links

Reading order for a stranger: [PROJECT.md](context/PROJECT.md) →
[USERS.md](context/USERS.md) → [FEATURES.md](context/FEATURES.md) →
[ARCHITECTURE.md](context/ARCHITECTURE.md) → [STANDARDS.md](context/STANDARDS.md) →
[TOOLS.md](context/TOOLS.md) → [STYLE.md](context/STYLE.md) →
[CLAUDE.md](context/CLAUDE.md)

## AI Use

### Tool and task delegated

I used GitHub Copilot to help wire the static page to the Cloudflare Worker and document the deployment and
verification evidence.

### Why it was delegated

The task involved repetitive API wiring and comparing several project files
against the HW4 checklist. Delegating that first pass made it easier to keep
the fetch boundary, error paths, and documentation consistent while I remained
responsible for reviewing the result.

### How it was checked

I checked the JavaScript with syntax checks, exercised Worker routes with a D1
stub, deployed the Worker, and tested the Live Server page. I also checked the
SQL statements use parameter binding and reviewed the CORS, D1, validation, and
error-handling configuration. A real network outage and the deployed 500 path
were not fully verified, so they remain marked CANNOT TEST YET.

Hours spent: _7.5_.
