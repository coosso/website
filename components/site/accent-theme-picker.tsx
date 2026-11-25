'use client';

import { Popover } from '@base-ui/react/popover';
import { Check, Palette } from 'lucide-react';
import { accentThemeIds, accentThemes } from './accent-theme';
import { setAccentTheme, useAccentTheme } from './use-accent-theme';

export function AccentThemeOptions() {
  const { id: selected } = useAccentTheme();
  return (
    <fieldset className="site-accent-options">
      <legend>配色主题</legend>
      <div className="site-accent-grid">
        {accentThemeIds.map(id => {
          const { label, art } = accentThemes[id];
          return (
            <button key={id} type="button" className="site-accent-option" aria-pressed={id === selected}
              onClick={() => setAccentTheme(id)}>
              <span className="site-accent-swatch" style={{ backgroundImage: `linear-gradient(150deg, ${art.tint}, ${art.vivid})` }} aria-hidden="true">
                {id === selected && <Check size={14} strokeWidth={2.5} />}
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function AccentThemePicker() {
  return (
    <div className="site-desktop-accent-picker">
      <Popover.Root>
        <Popover.Trigger className="site-icon-button site-accent-trigger" aria-label="配色主题" title="配色主题">
          <Palette size={18} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner className="site-accent-positioner" align="end" sideOffset={12}>
            <Popover.Popup className="site-accent-popover" aria-label="配色主题">
              <AccentThemeOptions />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
