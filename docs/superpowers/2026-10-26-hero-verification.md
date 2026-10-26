# Interactive Hero verification — 2026-10-26

Implemented directly in `/Users/coosso/Workspace/website`, preserving the existing staged changes. No staging or commits were performed.

- Official React Bits Aurora: native pointer interaction enabled for fine pointers.
- Official Particles: orange particles, pointer repulsion, click waves, 260 desktop / 80 coarse-pointer particles, pixel ratio 1.
- Official ClickSpark: twelve glowing streaks with an expanding ring, scoped to Hero mouse presses.
- Site integration: cursor halo/ring and planet parallax share Hero coordinates; pointer leave, scroll, blur, cancel and motion disable reset the position.
- WebGL-unavailable fallback: gradient nebula and CSS motes; cursor, parallax and click sparks remain available. The internal browser could create a context but could not compile the particle shader. Failed canvases are hidden, avoiding an opaque white surface. Full WebGL animation was not visually verified in this browser.

## Fresh verification

- `npm run types:check`: passed.
- ESLint for homepage, HeroScene, the React Bits wrappers, Aurora, Particles and ClickSpark: passed without warnings.
- `npm run build`: passed, 183 static pages. Existing metadataBase warnings remain.
- `git diff --check`: passed.
- Browser: 1440 × 1000 desktop and 391 × 844 mobile CSS viewports, both themes, no mobile horizontal overflow.
- Mouse press: pointer coordinates updated and one native ClickSpark burst appeared.
- Pause: Hero canvas count dropped to zero, cursor state reset to idle, planet transform became none, CSS dust animation was paused. Resume restored the layers.
- Browser screenshot artifacts: desktop-interactive.png, mobile.png and light.png under the task's `hero/` visualization folder.

The repository has no automated test script. Full repository ESLint has previously recorded unrelated failures in `components/base-ui`; this change was checked with scoped ESLint.

## Morphing polyhedron follow-up

The static planet was replaced with a site-specific, dependency-free SVG polyhedron: 192 triangular facets and a shared closed mesh aligned with all target face boundaries. It morphs continuously through sphere, cube, octahedral diamond and tetrahedron on a 20.8-second loop, with smooth transitions and slow 3D rotation. The renderer caps updates at 30 FPS and suspends when paused, offscreen or in a hidden tab. Pause preserves the current geometry and resumes from that point.

- Geometry tests: `node --experimental-strip-types --test components/site/morph-geometry.test.mjs` passed all four tests (closed topology, target surfaces, continuous transitions and planar facets at every sharp edge). Node reports a module-type detection warning for the standalone TypeScript test import.
- Fresh `npm run types:check`, scoped ESLint and production build passed. The same metadataBase warnings remain.
- Browser: live morphing geometry rendered without WebGL; pause preserved the sampled facet coordinates exactly. Desktop and 391px mobile layouts were checked, with no mobile horizontal overflow. Existing Hero pointer parallax and decorative effects compose with the new component.
- Screenshots: `polyhedron/hero-final.png` and `polyhedron/mobile.png` in this task's visualization folder. Earlier prototype screenshots in that folder are superseded by these final files.
