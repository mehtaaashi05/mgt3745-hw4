---
# Tokens: what a machine reads.
color-primary: "#051E39"
color-accent: "#B39051"
color-background: "#FFFFFF"
color-text: "#1A1A1A"
font-body: "Roboto"
font-heading: "Roboto Slab"
font-size-min: 14px
space-unit: 8px
radius: 4px
---

# STYLE.md

Tokens above, rationale below. The frontmatter is what a machine reads; this
body is what a human reads. One sentence per token. "Looks clean" is fog;
"gold fails contrast on white at body size" is at altitude.

## Rationale

- **color-primary**: Deep blue gives the directory a calm, work-focused tone and maintains contrast on white.
- **color-accent**: Gold is reserved for focus outlines and calls to action so it signals interaction without taking over the page.
- **font-body / font-heading**: Roboto keeps short directory entries familiar and readable while Roboto Slab gives the heading a modest editorial distinction.
- **space-unit**: An 8px rhythm keeps the form and list aligned without making a small tool feel crowded.
- **font-size-min**: 14px is the smallest text so supporting instructions remain readable for users scanning quickly.

## Refusals

Things this interface will never do, and why. Taken from the interface you
resent. Name the Law of UX it breaks (lawsofux.com).

1. No modal interrupts an entry submission. It breaks user control by adding a decision the user did not request.
2. No decorative animation delays the directory list. It breaks the Doherty Threshold by making a simple result feel slower.

## Sources

- Admired: GOV.UK forms, for direct labels and restrained spacing.
- Resented: notification-heavy social feeds, for interrupting a focused task with competing prompts.
