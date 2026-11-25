'use client';

import { useSyncExternalStore } from 'react';
import { accentThemes, accentThemeStorageKey, defaultAccentTheme, parseAccentTheme, type AccentThemeId } from './accent-theme';

const changeEvent = 'space-accent-change';
const getAccent = () => parseAccentTheme(document.documentElement.dataset.accent);
const getServerAccent = (): AccentThemeId => defaultAccentTheme;

function subscribe(callback: () => void) {
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== accentThemeStorageKey && event.key !== null) return;
    try {
      if (event.storageArea !== localStorage) return;
      document.documentElement.dataset.accent = parseAccentTheme(localStorage.getItem(accentThemeStorageKey));
    } catch { return; }
    callback();
  };
  window.addEventListener(changeEvent, callback);
  window.addEventListener('storage', syncStorage);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener('storage', syncStorage);
  };
}

export function useAccentTheme() {
  const id = useSyncExternalStore(subscribe, getAccent, getServerAccent);
  return { id, theme: accentThemes[id] };
}

export function setAccentTheme(id: AccentThemeId) {
  document.documentElement.dataset.accent = id;
  try { localStorage.setItem(accentThemeStorageKey, id); }
  catch { /* The current page can still apply the preference. */ }
  window.dispatchEvent(new Event(changeEvent));
}
