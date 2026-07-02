# ETI360 Homepage UI Update – Design & Implementation Brief

## Purpose
Update the ETI360 homepage UI to match the approved Stitch design and visual style.
This is a **refactor and alignment task**, not a redesign.

The goal is to preserve the existing layout, hierarchy, and restraint while ensuring:
- governance alignment
- clean component structure
- Sanity-driven content
- long-term maintainability

---

## Source of truth
- **Stitch design output** = visual and structural authority
- **Provided HTML** = layout and component scaffold (reference only)
- **Sanity** = canonical source for all content and images

Do **not** treat Stitch HTML as production-ready code.

---

## What to keep (do not change)
- Overall page structure and section order
- Spacing, rhythm, and grid logic
- Typography scale and hierarchy
- Navigation labels and CTA language (“Start a conversation”)
- Neutral color system with a single blue accent
- Tailwind-based implementation approach

---

## Required changes (mandatory)

### 1. Refactor HTML into clean components
Rebuild the homepage as reusable components, for example:
- Header / Navigation
- Hero
- Context band
- Decision-support grid
- Applicability section
- CTA band
- Footer

Remove:
- Stitch placeholders
- Hard-coded copy
- Hard-coded image URLs
- Inline assumptions

Replace with semantic bindings (example):
```
{{hero.headline}}
{{hero.subheadline}}
{{hero.image}}
```

---

### 2. Sanity-first content model
All copy and images must be sourced from Sanity.

The homepage should map cleanly to:
- Hero fields (headline, subheadline, image, CTA)
- Context section copy
- Decision-support blocks (title + description)
- Applicability list
- CTA section copy

No content should be frozen in markup.

---

### 3. Hero image governance (critical)
Replace the current **people-forward / boardroom-style** hero imagery.

Approved hero image characteristics:
- Environment-first
- Travel- or institution-adjacent
- Documentary, observational
- No meetings, no authority cues
- No implied decision-making by ETI360

The image container stays; only the **asset and semantics change**.

---

### 4. Language discipline (UI-level awareness)
While copy lives in Sanity, the UI must not imply:
- ETI360 makes decisions
- ETI360 approves outcomes
- ETI360 guarantees safety or protection

Avoid visual or structural cues that suggest authority, control, or oversight by ETI360.

---

## What not to do
- Do not paste Stitch HTML directly into production
- Do not bind Sanity fields to Stitch-specific markup
- Do not introduce SaaS, dashboard, or marketing patterns
- Do not redesign layout or experiment visually

This task is **alignment and refactoring**, not ideation.

---

## Success criteria
The updated homepage should:
- Match the Stitch design visually and structurally
- Be fully driven by Sanity content
- Feel appropriate for board-level review
- Avoid promotional or authority-signaling cues
- Be easy to maintain and iterate

If any element feels “salesy,” “reassuring,” or “expert-as-decision-maker,” revise it.

---

## Final instruction
Rebuild, don’t paste.
Preserve intent, not markup.
