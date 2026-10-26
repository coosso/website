# React Bits: Obsidian × Electric Orange

Approved direction: the user selected 黑曜石 × 电光橙 and explicitly requested full implementation using as many fitting React Bits components as possible.

## Outcome

Rebuild every public page as a cohesive personal engineering space. Use obsidian surfaces, warm off-white text, electric orange highlights, large editorial Chinese typography, soft rounded panels, subtle grain, luminous borders and generous spacing. Keep light mode equally usable. Present real existing posts, notes, profile and project information through the new design.

## Pages and components

- Home: Aurora hero, BlurText title, RotatingText focus, DecryptedText labels, SpotlightCard bento panels, TiltedCard identity panel, CountUp statistics, LogoLoop toolchain, ScrollReveal statement, Magnet and StarBorder actions.
- Blog and tag pages: Threads hero, BlurText page title, SpotlightCard featured story and article cards, AnimatedContent staggered grid, active filter pills and real empty states.
- Article: calm header with BlurText, reading progress, updated prose surface, SpotlightCard related content and adjacent navigation.
- About: Threads hero, TiltedCard identity and project cards, AnimatedContent education and contributions, ScrollReveal personal statement, StarBorder contact links.
- Notes: updated Fumadocs sidebar and reading panels, animated title, calm Threads header, copy/view options, headings, code, table of contents and document navigation remain usable.
- Shared shell: floating glass navigation with active indicator, search, theme and motion controls, consistent footer.

## Architecture

Vendor actual TypeScript/Tailwind source from DavidHDev/react-bits into components/react-bits/vendor. Record upstream paths and preserve the license. Small site wrappers unify colors, pause behavior, theme, SSR fallbacks and imports. Page data stays on the server; client effects accept serializable values or rendered children.

## Constraints and behavior

- Read installed Next.js 16.3 docs before implementation.
- Use existing React 19, Motion, Tailwind 4 and Fumadocs; add GSAP only for official AnimatedContent and ScrollReveal.
- Respect prefers-reduced-motion and provide a visible global pause control for continuous decorative animation.
- Decorative backgrounds have pointer-events none and aria-hidden; links and cards retain keyboard focus and touch usability.
- Render meaningful text and navigation on the server and with JavaScript disabled.
- Lazy-load WebGL backgrounds on the client, limit pixel density, and leave a CSS gradient fallback when WebGL is unavailable.
- No source content changes, fabricated metrics or fabricated project claims.
- No unsolicited deployment or publication. Leave a reviewable local worktree.

## Verification

Run baseline type checking, then final type checking, ESLint and a production build. Check home, blog, tag, article, about and notes routes; desktop/mobile overflow, light/dark themes, navigation, search, pause, reduced motion, keyboard focus and browser console. Review the final diff independently.
