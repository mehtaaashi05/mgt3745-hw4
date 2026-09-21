# STANDARDS.md

# Standards

Status: ACTIVE in Module 3. Adapt these rules to your feature and follow them.

1. In `app.js`, use names that distinguish the directory's roles: `notes` is the saved list, `candidate` is the submitted value, and `nextNotes` is the proposed replacement; do not collapse these meanings into names such as `data` or `value`.
2. Put user-facing elements and their initial attributes in `index.html`, visual states in `styles.css`, and storage or interaction decisions in `app.js`; a feature is incomplete when its logic is split across those ownership boundaries.
3. Comment the directory's invariants when they could be accidentally broken, especially that storage succeeds before the interface changes; leave self-evident DOM operations uncommented.
4. Begin each commit message with an action verb and name the user-visible result, using a form such as `Keep note text after a failed save` rather than a vague message like `Update files`.
5. Do not turn note text into an HTML string: `innerHTML`, `outerHTML`, and `insertAdjacentHTML` are forbidden for note content; create elements and assign text through DOM APIs instead.

This document is the source of truth.

Split Test:

Rule 1: role-distinguishing names (`notes`, `candidate`, `nextNotes`). This applies to every task that touches these variables, and it does not change from task to task. If it lived only in a one-off prompt, the risk is Confusion: a later task could reintroduce a generic name like `data` and nothing would catch the drift back toward ambiguity. Verdict: belongs in `CLAUDE.md`.

Rule 3: comment invariants that could be accidentally broken and leave the obvious uncommented. This also applies to every task that touches app.js logic, and it does not change from task to task. If it were not persistent, the risk is Distraction: without a standing reminder of which things deserve a comment, an agent tends to either comment everything or comment nothing, and the actual invariant is exactly the kind of thing that is easy to break without a rule keeping it visible. Verdict: belongs in `CLAUDE.md`.

Rule 5: no `innerHTML`, `outerHTML`, or `insertAdjacentHTML` for note content. This only matters for tasks that render note text to the page. If it stays in `CLAUDE.md` permanently, the risk is Distraction: attention gets spent evaluating a security rule against tasks it has no say on. This is the rule I am moving out. Verdict: belongs in the prompt for the specific task that needs it.

Prompt snippet:

> When rendering user-entered note text, use DOM APIs and `textContent`; do not use `innerHTML`, `outerHTML`, or `insertAdjacentHTML` on note content.

If this file and `CLAUDE.md` ever disagree, `STANDARDS.md` is normative — repair the inconsistent one rather than following each separately.
## Rules

1. *Your HW3 rules, five minimum.*
2. Separation of concerns: HTML for structure, CSS for presentation, JS for behavior and data.
3. User input reaches the page through `textContent`, never `innerHTML`.
4. **(HW4)** User values reach SQL through `bind()`, never string concatenation.
5. **(HW4)** No credential in the repository. Not in code, not in config, not in a context file. Database ids are addresses and may appear in `wrangler.toml`.
6. **(HW4)** A failed request is shown to the user on the page and is never thrown in the console.
7. No stray `console.log` in committed code.

## Naming

Use camelCase for JavaScript identifiers, kebab-case for new filenames, and
descriptive names for values that cross the browser/server boundary.

## Documentation

Inline comments explain why, never what. README stays current with each
deployed change.
