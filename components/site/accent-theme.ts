type Palette = {
  bg: string;
  surface: string;
  raised: string;
  ink: string;
  muted: string;
  accent: string;
};

type AccentTheme = {
  label: string;
  light: Palette;
  dark: Palette;
  art: { base: string; shade: string; vivid: string; tint: string; gleam: string };
};

export const accentThemes = {
  blue: {
    label: '钴蓝',
    light: { bg: '#f1f5fa', surface: '#fbfdff', raised: '#e5ecf5', ink: '#192535', muted: '#4e5e72', accent: '#2144c2' },
    dark: { bg: '#0d121d', surface: '#141c2a', raised: '#202a3a', ink: '#edf3ff', muted: '#a7b6cb', accent: '#93b5ff' },
    art: { base: '#11192d', shade: '#294488', vivid: '#6c95ff', tint: '#a3beff', gleam: '#e0ebff' },
  },
  orange: {
    label: '琥珀橙',
    light: { bg: '#f6f4f0', surface: '#fffefa', raised: '#ece9e3', ink: '#25231f', muted: '#605c54', accent: '#a33b0c' },
    dark: { bg: '#0c0d0e', surface: '#141516', raised: '#1d1e20', ink: '#f0ede6', muted: '#aaa7a2', accent: '#ff8549' },
    art: { base: '#201613', shade: '#782e18', vivid: '#ff783b', tint: '#ffb27c', gleam: '#ffe3c6' },
  },
  green: {
    label: '翡翠绿',
    light: { bg: '#f1f6f3', surface: '#fbfefc', raised: '#e2eee8', ink: '#182b23', muted: '#4b6257', accent: '#006248' },
    dark: { bg: '#0c1511', surface: '#131f19', raised: '#1d2c24', ink: '#e8f5ed', muted: '#a1baac', accent: '#71e2b7' },
    art: { base: '#10231d', shade: '#16604b', vivid: '#3fd4a4', tint: '#8ce9c6', gleam: '#d5fae9' },
  },
  violet: {
    label: '鸢尾紫',
    light: { bg: '#f6f3f9', surface: '#fefbff', raised: '#efe8f6', ink: '#2a2034', muted: '#61546e', accent: '#6639a8' },
    dark: { bg: '#15101c', surface: '#1e1728', raised: '#2a2038', ink: '#f4ecfd', muted: '#b8a9c9', accent: '#c4a5ff' },
    art: { base: '#211632', shade: '#563784', vivid: '#a77cf4', tint: '#cbb0ff', gleam: '#f0e4ff' },
  },
  rose: {
    label: '玫瑰红',
    light: { bg: '#faf3f4', surface: '#fffbfc', raised: '#f4e6e9', ink: '#331e26', muted: '#6a515d', accent: '#a22b57' },
    dark: { bg: '#1a1015', surface: '#25171e', raised: '#33212a', ink: '#fcecf1', muted: '#c5a8b4', accent: '#ffa4c0' },
    art: { base: '#301721', shade: '#762d4b', vivid: '#f273a2', tint: '#ffb0cb', gleam: '#ffe0ed' },
  },
} as const satisfies Record<string, AccentTheme>;

export type AccentThemeId = keyof typeof accentThemes;
export const defaultAccentTheme = 'blue';
export const accentThemeStorageKey = 'space-accent-theme';
export const accentThemeIds = Object.keys(accentThemes) as AccentThemeId[];

export function parseAccentTheme(value: string | null | undefined): AccentThemeId {
  return value && Object.hasOwn(accentThemes, value) ? value as AccentThemeId : defaultAccentTheme;
}

function paletteStyles({ bg, surface, raised, ink, muted, accent }: Palette) {
  return `--site-bg:${bg};--site-surface:${surface};--site-surface-raised:${raised};--site-ink:${ink};--site-muted:${muted};--site-accent:${accent}`;
}

// CSS and WebGL use the same palette data. Each mode owns its text and surfaces.
export const accentThemeStyles = accentThemeIds.map(id => {
  const { light, dark, art } = accentThemes[id];
  const selector = id === defaultAccentTheme ? ':root' : `:root[data-accent="${id}"]`;
  const artStyles = Object.entries(art).map(([role, color]) => `--site-art-${role}:${color}`).join(';');
  return `${selector}{${paletteStyles(light)};${artStyles}}\n${selector}.dark{${paletteStyles(dark)}}`;
}).join('\n');

// Apply the saved preference before the body paints, even while React is loading.
export const accentThemeScript = `(() => {
  let accent;
  try { accent = localStorage.getItem(${JSON.stringify(accentThemeStorageKey)}); } catch {}
  document.documentElement.dataset.accent = ${JSON.stringify(accentThemeIds)}.includes(accent)
    ? accent : ${JSON.stringify(defaultAccentTheme)};
})();`;
