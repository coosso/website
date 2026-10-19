# Homepage React Bits adaptations

Sources: [React Bits](https://github.com/DavidHDev/react-bits), by David Haz,
reviewed on 2026-10-19.

`home-effects.tsx` contains small, site-specific adaptations of these components:

- [SpotlightCard](https://github.com/DavidHDev/react-bits/tree/main/src/ts-tailwind/Components/SpotlightCard): pointer-positioned radial illumination, adapted to dashed borders and the site's orange palette.
- [Magnet](https://github.com/DavidHDev/react-bits/tree/main/src/ts-tailwind/Animations/Magnet): pointer-relative displacement, limited to 5px inside a stationary hit area.
- [CountUp](https://github.com/DavidHDev/react-bits/tree/main/src/ts-tailwind/TextAnimations/CountUp): Motion-driven numeric interpolation on entering the viewport.
- [DecryptedText](https://github.com/DavidHDev/react-bits/tree/main/src/ts-tailwind/TextAnimations/DecryptedText): random-glyph decryption with centre-out reveal and hover replay.
- [AnimatedContent](https://reactbits.dev/animations/animated-content): viewport-triggered entrance, adapted to IntersectionObserver and CSS transitions instead of adding GSAP.
- [ShinyText](https://github.com/DavidHDev/react-bits/tree/main/src/ts-tailwind/TextAnimations/ShinyText): moving gradient clipped to text, adapted to a bounded CSS animation.

These are tailored adaptations, not drop-in copies of the full upstream APIs.
Only the existing `motion` dependency is used. The homepage remains a Server
Component, with isolated client boundaries for interactive elements. No
background replacement, WebGL renderer, global pointer listener or scroll
interception is introduced.

Server output contains the real text and counts. Effects respect reduced-motion
preferences; mouse-only effects ignore touch. Screen readers receive static
text rather than changing random glyphs and counter frames. The reveal is
progressively enhanced, so content is visible when JavaScript is disabled.

The upstream license is preserved in [LICENSE.md](./LICENSE.md).
