# Marketing Website Build Plan

## Purpose
Create a fast, maintainable marketing website using **Sanity as the CMS**, **GitHub as source control**, and a **modern frontend framework**. Content is authored by the marketing team in **Markdown** and rendered into production-ready pages.

This document is written to orient an **AI coding assistant in VS Code** so it can scaffold, wire, and implement the site with minimal back-and-forth.

---

## High-Level Architecture

- **Content**: Sanity (hosted CMS)
- **Content Authoring**: Markdown supplied by marketing
- **Repo**: GitHub (single frontend repo)
- **Framework**: Next.js (App Router)
- **Hosting**: Vercel
- **No Render**: No custom APIs, workers, or databases required

Flow:
```
Marketing Markdown → Sanity → Frontend (Next.js) → Vercel
GitHub push → Vercel build → Live site
```

---

## Non-Goals (Explicit)

- No custom backend services
- No databases beyond Sanity
- No user auth
- No dashboards or internal tools
- No speculative features

This is a **marketing site**, not an application.

---

## Content Model Philosophy

Sanity is used as a **structured layer over Markdown**, not a WYSIWYG replacement.

Principles:
- Marketing owns copy
- Engineering owns layout, components, and rendering
- Content is portable, versioned, and previewable

### Expected Content Types

- Pages
  - Home
  - Product / Solution pages (TripRisk360, ETI360, etc.)
  - About
  - Contact
- Reusable blocks
  - Hero sections
  - Feature lists
  - Callouts
  - Risk / governance diagrams (static images)

Markdown will be:
- Stored in Sanity fields
- Parsed and rendered by the frontend

---

## Design & UX Constraints

- Fully responsive (mobile, tablet, desktop)
- Marketing-first layout decisions
- Clear visual hierarchy
- Image-light, text-forward
- Fast initial page load

No animation-heavy or novelty UI.

---

## SEO & Performance Assumptions

- Static generation by default
- Metadata defined per page in Sanity
- Clean URLs
- No client-side data fetching unless required

---

## AI Coding Assistant Instructions (Critical)

The AI working in VS Code should assume:

- Local development
- macOS
- Terminal-driven workflow
- Production-quality code only

The AI should:
- Scaffold the project
- Define Sanity schemas
- Map Markdown fields to components
- Implement responsive layouts
- Avoid tutorials or demo code

The AI should **not**:
- Introduce backend services
- Add auth, databases, or APIs
- Invent content

---

## Sanity Responsibilities

- Define schemas for pages and blocks
- Store Markdown content
- Provide preview capability
- Act as the single content source of truth

---

## Frontend Responsibilities

- Routing
- Layouts
- Markdown rendering
- Responsive behavior
- SEO
- Deployment

---

## GitHub Responsibilities

- Version control
- CI trigger for Vercel
- Review surface for AI-generated changes

---

## Deployment

- Vercel connected to GitHub
- Preview deployments on PRs
- Production on main branch

---

## Success Criteria

- Marketing can update content without engineering
- Site builds and deploys automatically
- Pages render consistently across devices
- No backend maintenance burden

---

## Future Expansion (Out of Scope, But Compatible)

- Blog / insights section
- Localization
- Light analytics

No architectural changes required for these.

---

## Summary

This plan intentionally minimizes moving parts:

- Sanity for content
- GitHub for control
- Next.js + Vercel for delivery

The AI’s job is to **execute**, not redesign the system.

