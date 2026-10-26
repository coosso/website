# React Bits Obsidian Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans to implement the scoped tasks below.

**Goal:** Fully implement the approved obsidian and electric orange redesign across every public page with official React Bits components.

**Architecture:** Shared vendor components and site effect wrappers support server-rendered pages. Independent route groups can be rebuilt concurrently after the component interfaces are fixed. Root owns shared CSS, wrappers, shell and integration; page workers own disjoint route files and their page CSS.

**Tech Stack:** Next.js 16.3, React 19, TypeScript, Tailwind 4, Motion, GSAP, Fumadocs.

**Spec:** docs/superpowers/specs/2026-10-22-react-bits-obsidian-design.md

## Global Constraints

- Keep all content-driven routes, metadata, search and note controls functional.
- Use the official React Bits TypeScript/Tailwind implementations and preserve attribution.
- Support dark/light themes, reduced motion, global pause, keyboard navigation, touch and no-JavaScript text.
- Root owns shared styling and component interfaces. Workers only edit explicitly assigned route files and scoped CSS.
- Read local Next.js use-client and lazy-loading documentation before writing code.
- Keep user changes in the original checkout intact; perform work in the managed worktree.

## Review Focus

- Long Chinese titles and dense tag sets wrap without horizontal overflow at 375px.
- Motion pause and OS reduced motion stop backgrounds, rotating labels and marquee loops.
- SSR hydration and route transitions do not lose meaningful text or expose random glyphs to screen readers.
- Nested article/tag links remain valid, independently focusable and clickable.
- Notes keep sidebar, table of contents, code blocks and copy actions usable.

### Task 1: Shared React Bits foundation and shell (root)

Files: components/react-bits/vendor/*, components/react-bits/index.tsx, components/site/*, app/global.css, app/layout.tsx, app/(home)/layout.tsx, lib/layout.shared.tsx, package.json, pnpm-lock.yaml.

Interfaces produced: AnimatedContent(children, className?, delay?: seconds), BlurText(text, className?), DecryptedText(text, className?), ShinyText(text?, children?, className?), RotatingText(texts, className?), CountUp(to), SpotlightCard(children, className?), TiltedCard(children, className?), Magnet(children, className?), StarBorder(children, className?), LogoLoop(items: string[]), ScrollReveal(children: string, className?), AuroraBackground(className?), ThreadsBackground(className?).

Shared CSS: site-container (1120px centered), site-section, site-eyebrow, site-heading, site-lead, site-muted, site-button, site-button-secondary, site-panel, site-tag, site-section-heading, site-divider, site-link.

- [x] Vendor sources with attribution, install GSAP and add motion/theme aware wrappers.
- [x] Implement accessible header/footer and global pause control.
- [x] Establish responsive theme tokens and typography.
- [x] Verify types and lint, SSR text and client hydration.

### Task 2: Home (worker)

Files: app/(home)/page.tsx, components/site/home.css.

Consumes shared foundation above. Use at least Aurora, BlurText, RotatingText, SpotlightCard, TiltedCard, CountUp, LogoLoop, ScrollReveal, Magnet, StarBorder, AnimatedContent and DecryptedText. Real post/note counts and recent articles. Deliver a distinctive full-width hero with artistic orange glow and asymmetrical bento content.

- [x] Rebuild all homepage sections with the approved palette and real content.
- [x] Verify mobile title wrapping and valid links.
- [x] Run scoped ESLint and report used components.

### Task 3: Blog, tags and article (worker)

Files: app/(home)/blog/**, components/blog/**, components/site/blog.css.

Consumes shared foundation. All blog routes remain server components with existing metadata and static params. Add themed feature art with CSS/native SVG, hero, article grid, filters, empty states, article header, related cards, prev/next cards; root provides ReadingProgress from components/site/reading-progress.

- [x] Rebuild listing, filters and cards with official effects.
- [x] Rebuild article reading experience and retain MDX.
- [x] Verify nested-link semantics, encoded tags and empty results.
- [x] Run scoped ESLint and report.

### Task 4: About and notes (worker)

Files: app/(home)/about/page.tsx, app/(home)/notes/**, components/site/about.css, components/site/notes.css.

Consumes shared foundation. Keep existing profile/project data without creating new personal claims. Rebuild about with varied cards, timeline, project grid and contact. Notes retain Fumadocs APIs and real content while gaining a new header and surfaces.

- [x] Rebuild profile, education, projects, contributions and contact.
- [x] Upgrade note header and document surfaces.
- [x] Verify TOC/sidebar/copy actions and long titles.
- [x] Run scoped ESLint and report.

### Task 5: Integration and independent review (root + reviewer)

- [x] Inspect all worker changes and resolve interface and styling problems.
- [x] Run type check, lint and production build.
- [x] Browser-check all route classes at desktop and mobile, themes, pause, search and reduced motion.
- [x] Dispatch fresh independent review; fix important findings and rerun affected checks.
- [x] Record final verification and deliver worktree path and preview.
