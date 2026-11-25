import assert from 'node:assert/strict';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { accentThemeIds, accentThemeScript, accentThemeStyles, accentThemes, parseAccentTheme } from './accent-theme.ts';

function rgb(hex) {
  return hex.slice(1).match(/../g).map(channel => parseInt(channel, 16) / 255);
}

function luminance(channels) {
  return channels.map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
    .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(a, b) {
  const [low, high] = [luminance(a), luminance(b)].sort((a, b) => a - b);
  return (high + 0.05) / (low + 0.05);
}

test('five accent themes expose accessible text and accents in both modes', () => {
  assert.deepEqual(accentThemeIds, ['blue', 'orange', 'green', 'violet', 'rose']);
  for (const [id, theme] of Object.entries(accentThemes)) {
    for (const color of [theme.art.vivid, theme.art.tint]) {
      assert.ok(contrast(rgb(color), rgb(theme.art.base)) >= 4.5, `${id}: artwork labels on dark illustrations`);
    }
    for (const mode of ['light', 'dark']) {
      const { bg, surface, raised, ink, muted, accent } = theme[mode];
      for (const background of [bg, surface, raised]) {
        for (const foreground of [ink, muted, accent]) {
          assert.ok(contrast(rgb(foreground), rgb(background)) >= 4.5, `${id} ${mode}: ${foreground} on ${background}`);
        }
        const tint = rgb(background).map((channel, index) => channel * 0.92 + rgb(accent)[index] * 0.08);
        assert.ok(contrast(rgb(accent), tint) >= 4.5, `${id} ${mode}: accent on selected tint`);
      }
      assert.ok(accentThemeStyles.includes(`--site-accent:${accent}`));
    }
  }
});

test('the first render restores a valid accent and falls back to cobalt blue when storage is unavailable', () => {
  for (const stored of [...Object.keys(accentThemes), null, 'unknown', 'toString']) {
    const dataset = {};
    runInNewContext(accentThemeScript, {
      document: { documentElement: { dataset } },
      localStorage: { getItem: () => stored },
    });
    assert.equal(dataset.accent, Object.hasOwn(accentThemes, stored) ? stored : 'blue');
    assert.equal(dataset.accent, parseAccentTheme(stored));
  }
  const dataset = {};
  runInNewContext(accentThemeScript, {
    document: { documentElement: { dataset } },
    localStorage: { getItem() { throw new Error('storage blocked'); } },
  });
  assert.equal(dataset.accent, 'blue');
});

test('the pre-hydration stylesheet uses cobalt blue in both modes', () => {
  assert.match(accentThemeStyles, /^:root\{[^}]*--site-accent:#2144c2[};]/m);
  assert.match(accentThemeStyles, /^:root\.dark\{[^}]*--site-accent:#93b5ff[};]/m);
});
