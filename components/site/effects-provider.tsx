'use client';

import { createContext, use, useEffect, useSyncExternalStore, type ReactNode } from 'react';

const STORAGE_KEY = 'space-motion-paused';
const EVENT = 'space-motion-change';
let memoryPaused = false;
let storageWriteFailed = false;
const subscribeHydration = () => () => {};
const getHydrated = () => true;
const getServerValue = () => false;
const subscribePreference = (callback: () => void) => {
  window.addEventListener(EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener('storage', callback);
  };
};
const getPaused = () => {
  if (storageWriteFailed) return memoryPaused;
  try { return localStorage.getItem(STORAGE_KEY) === 'true'; }
  catch { return memoryPaused; }
};
const subscribeReduced = (callback: () => void) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const getReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EffectsContext = createContext({
  hydrated: false,
  paused: false,
  reduced: false,
  disabled: false,
  toggle: () => {},
});

export function EffectsProvider({ children }: { children: ReactNode }) {
  const hydrated = useSyncExternalStore(subscribeHydration, getHydrated, getServerValue);
  const paused = useSyncExternalStore(subscribePreference, getPaused, getServerValue);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getServerValue);
  const disabled = paused || reduced;

  const toggle = () => {
    memoryPaused = !paused;
    try { localStorage.setItem(STORAGE_KEY, String(!paused)); }
    catch { storageWriteFailed = true; }
    window.dispatchEvent(new Event(EVENT));
  };

  useEffect(() => {
    document.documentElement.dataset.motion = disabled ? 'paused' : 'active';
    return () => { delete document.documentElement.dataset.motion; };
  }, [disabled]);

  return <EffectsContext value={{ hydrated, paused, reduced, disabled, toggle }}>{children}</EffectsContext>;
}

export function useEffects() {
  return use(EffectsContext);
}
