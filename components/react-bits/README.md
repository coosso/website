# React Bits site components

Official source: [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits), by David Haz. Imported from the TypeScript/Tailwind implementation on 2026-10-22. The upstream MIT + Commons Clause terms are preserved in [LICENSE.md](./LICENSE.md).

## Components used

| Component | Upstream path under src/ts-tailwind | Used for |
| --- | --- | --- |
| Aurora | Backgrounds/Aurora | Home hero |
| Particles | Backgrounds/Particles | Hero pointer repulsion and click waves |
| ClickSpark | Animations/ClickSpark | Hero electric-orange click bursts |
| Threads | Backgrounds/Threads | Blog, profile and note headers |
| SpotlightCard | Components/SpotlightCard | Bento, articles, projects and contact |
| TiltedCard | Components/TiltedCard | Identity and project cards |
| StarBorder | Animations/StarBorder | Primary actions |
| LogoLoop | Animations/LogoLoop | Toolchain |
| Magnet | Animations/Magnet | Navigation and actions |
| AnimatedContent | Animations/AnimatedContent | Section and card entrances |
| BlurText | TextAnimations/BlurText | Page titles |
| CountUp | TextAnimations/CountUp | Real blog/note totals |
| DecryptedText | TextAnimations/DecryptedText | Technical labels |
| RotatingText | TextAnimations/RotatingText | Home focus |
| ScrollReveal | TextAnimations/ScrollReveal | Home/profile statements |
| ShinyText | TextAnimations/ShinyText | Identity, links and footer |

The modules in `vendor/` retain the upstream implementations. `index.tsx` provides a small site API and applies theme colors, conservative animation settings, reduced motion and a persistent pause control. GSAP powers the official AnimatedContent and ScrollReveal; Motion powers the official text components.

## Site integration

- Pages and content data stay in Server Components. Server output includes real text, totals and links, including when JavaScript is disabled.
- WebGL backgrounds are loaded in browser-only chunks, use a gradient fallback and are removed when motion is disabled. Aurora renders at pixel ratio 1; its canvas is tinted to the site's orange palette.
- All effects share `EffectsProvider`. Pausing replaces continuous effects with static content and preserves the preference across navigation and reloads. OS reduced motion takes priority.
- Theme-aware wrappers supply concrete colors to ShinyText's canvas parser. Decorative layers are hidden from assistive technology and do not intercept pointer input.
- Native TiltedCard faces participate in normal layout for variable-height text cards; the site does not use its image or flip APIs.
- BlurText uses a span root so headings remain valid. Its word groups and ScrollReveal character groups can wrap long Chinese text.
- Aurora resolves hexadecimal colors directly before falling back to canvas color parsing.
- Settings and callback refs synchronize in commit effects rather than render, satisfying the installed React lint rules. BlurText keeps the immutable initial phase in state and schedules trigger changes; ScrollReveal omits a redundant mounted-state rerun. Other upstream behavior is retained.

The old homepage-only approximations and Aceternity demo effects have been replaced.

The Hero's morphing polyhedron is a site-specific SVG component, composed with the React Bits effects. Its shared triangular mesh continuously morphs between a faceted sphere, cube, octahedral diamond and tetrahedron. Three independently moving cloud layers follow the projected silhouette as the geometry changes. The entire scene preserves Hero pointer parallax, pauses in place with EffectsProvider, and suspends rendering offscreen or in a hidden tab. It requires no WebGL or additional dependencies.

## Interactive Hero (2026-10-26)

Particles and ClickSpark were imported from the official TypeScript/Tailwind sources on 2026-10-26. HeroScene combines them with Aurora's native mouse interaction, a CSS cursor halo and planet parallax. Each background observes the same Hero bounds; decorative layers preserve native cursor input, links and text selection. Fine mouse pointers enable repulsion, click waves, sparks and parallax; coarse pointers use 80 ambient particles. Motion pause/reduced motion removes the WebGL layers, hides the cursor and restores the static planet. Upstream visibility observers suspend background rendering offscreen.

Local adaptations: settings refs synchronize after commit, matching the other vendored components. ClickSpark restarts its listener effect when disabled changes, clearing in-flight bursts immediately on pause. HeroScene keeps server-rendered content outside the background layers that mount and unmount. No new runtime dependencies were added.

Aurora and Particles hide an unusable canvas when WebGL context creation or shader compilation fails. In that case the Hero uses its gradient nebula and deterministic CSS motes; the cursor glow, planet parallax and ClickSpark remain interactive. These motes are a site fallback, not a copy of React Bits Particles. The built-in browser preview uses this fallback when its WebGL shader pipeline is unavailable.
