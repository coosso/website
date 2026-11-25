'use client';

import { Flame, Leaf, Palette, Rose, Sparkles, Waves } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { accentThemeIds, accentThemes, type AccentThemeId } from './accent-theme';
import { setAccentTheme, useAccentTheme } from './use-accent-theme';

const accentIcons = { orange: Flame, blue: Waves, green: Leaf, violet: Sparkles, rose: Rose };

export function AccentThemePicker() {
  const { id: selected } = useAccentTheme();
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === 'light' ? 'light' : 'dark';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="site-icon-button" aria-label="配色主题" title="配色主题">
        <Palette size={18} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} aria-label="配色主题">
        <DropdownMenuRadioGroup value={selected} onValueChange={(value: AccentThemeId) => setAccentTheme(value)}>
          {accentThemeIds.map(id => {
            const theme = accentThemes[id];
            const Icon = accentIcons[id];
            return (
              <DropdownMenuRadioItem key={id} value={id} closeOnClick className="min-h-10">
                <Icon size={16} color={theme[mode].accent} aria-hidden="true" />
                {theme.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
