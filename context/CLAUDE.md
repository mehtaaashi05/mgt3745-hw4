# CLAUDE.md

Always-on instructions for any agent working in this repository. Read
STANDARDS.md for the human version; this file restates it as rules an
agent follows without being asked.

## Read first

PROJECT.md, FEATURES.md, ARCHITECTURE.md, STANDARDS.md, TOOLS.md, STYLE.md.
Do not read /curiosity unless asked.

## Rules

- Never use `innerHTML` with user input. Use `textContent`.

- In [app.js](../app.js), use names that distinguish the directory's roles: `notes` is the saved list, `candidate` is the submitted value, and `nextNotes` is the proposed replacement. Do not collapse these into one variable or reuse the wrong one in a different stage of the flow.
- Put user-facing elements and their initial attributes in [index.html](../index.html), visual states in [styles.css](../styles.css), and storage or interaction decisions in [app.js](../app.js). A feature is incomplete if its logic is split across files in a way that hides the behavior.
- Comment the directory's invariants when they could be accidentally broken. Leave self-evident DOM operations uncommented.
- Begin each commit message with an action verb and name the user-visible result (for example, "keep note text after a failed save."), never a vague message like "update files."
- When rendering user-entered note text, use DOM APIs and `textContent`. Do not use `innerHTML`, `outerHTML`, or `insertAdjacentHTML` on note content.
- Never build SQL by concatenating strings. Use prepare(...).bind(...).
- Never write a credential, token, or key into any file in this repository.
- Never add a dependency without adding a row to TOOLS.md.
- Handle failed responses on the page. Never throw to the console.

## When unsure

Ask, in a comment or in the chat, rather than guessing. Say what you could
not verify.

Colleague test
Who read it?: Regina
What they misunderstood or asked about?: She was confused by what a user-visible result meant and thought an example would help.
The revision I made: I added a concrete example to the commit-message rule so the agent has a clearer target: "keep note text after a failed save."
