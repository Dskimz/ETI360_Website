# ETI360 UI Style Guide (Portable)

Use this document to keep internal apps visually consistent with the public ETI360 site.

## Where the UI is defined (in this repo)
- Design tokens + baseline UI CSS (source of truth): `@eti360/design-system` (`eti360.css`)
- Marketing site global CSS: `apps/web/src/app/globals.css` (imports the design system + maps tokens into Tailwind)
- Header/navigation: `apps/web/src/components/SiteHeader.tsx`
- Section layout patterns: `apps/web/src/components/sections/SectionRenderer.tsx`
- Diagram/visual placeholders: `apps/web/src/components/DiagramBlock.tsx` and `apps/web/src/components/sections/sections/SectionVisual.tsx`
- Button + CTA styling examples: `apps/web/src/components/sections/sections/HeroSection.tsx` and `apps/web/src/components/sections/sections/CtaBlockSection.tsx`

## Brand posture (UI behavior)
- Calm, neutral, “briefing-like”.
- Prefer structure and whitespace over decoration.
- Avoid visual urgency: no flashing, no bright gradients, no aggressive shadows.

## Design tokens (copy into another project)
Preferred: import `@eti360/design-system/eti360.css` and use the tokens directly.

### Colors (core)
- Primary (navy): `#002b4f`
- Accent (gold): `#ffc300`
- Text (primary): `#000814`
- Background: `#ffffff`
- Band background (alternating sections): `#f7f7f8`
- Border: `#e5e7eb`
- Secondary surface tint (subtle): `rgba(0, 43, 79, 0.12)`
- Text tertiary: `rgba(0, 8, 20, 0.6)`

### Typography
- Font: `Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`
- Body line-height: `1.8`
- Max readable line length: ~`72ch` for paragraphs

### Spacing + layout
- Content width: `max-w-5xl` (centered)
- Horizontal padding: `px-6`
- Standard vertical section padding: `py-20`
- Use subtle dividers between sections: `border-t` with `border-border`
- Use alternating background bands (white / light gray) across sections

## Components and patterns (copy/paste spec)

### Top chrome
- Sticky header
- Thin gold divider under header
- Primary nav uses “pill” active state (background tint) and muted default text

### Buttons
- Primary CTA button:
  - Shape: pill (`rounded-full`)
  - Background: `bg-primary`
  - Text: white
  - Padding: `px-6 py-3`
  - Hover: subtle (opacity or tint), no dramatic shadow
- Secondary CTA button:
  - Shape: pill
  - Border: `border border-border`
  - Background: `bg-background`
  - Hover: `bg-secondary`

### DiagramBlock (visual container)
- Use as a reserved “visual slot” (diagram only; no photos).
- Fixed height:
  - Mobile: ~220px
  - Desktop: ~320px
- Surface:
  - Neutral background (`bg-secondary` or band background)
  - Dashed border for placeholders
- Placeholder text (two lines, centered):
  - `Diagram placeholder`
  - Second line describes intent (e.g., “Structured preparation → expert review → decision-ready documentation”)
- Optional caption below in small muted text (governance framing).

### Callout boxes (use sparingly)
Use shaded boxes only for:
- Governance boundaries
- Accountability statements
- Decision authority reminders

Visual treatment:
- `bg-secondary`
- `border border-border`
- Rounded corners (`rounded-2xl`)

## Do / Don’t

### Do
- Keep pages scannable: header → short intro → bullets → divider → next section.
- Use lists for structure and clarity.
- Keep diagrams abstract: boxes/arrows/stages (must work in grayscale).

### Don’t
- No stock photos, no people imagery, no “global” globe visuals.
- No SaaS-y card grids for everything; prefer flat sections.
- No CTA variants beyond:
  - Primary: “Start a conversation”
  - Secondary: “Read Insights”

## Quick implementation checklist for a new internal app
- Use the same tokens and font stack.
- Use the same max content width and spacing.
- Reuse the same button styles for actions.
- Use DiagramBlocks wherever you explain a workflow.
