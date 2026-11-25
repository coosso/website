'use client';

import { Circle, Feather, Gem, Hexagon, Palette, Rose } from 'lucide-react';
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

const accentIcons = { blue: Gem, orange: Hexagon, green: Circle, violet: Feather, rose: Rose };

export function AccentThemePicker() {
  const { id: selected } = useAccentTheme();
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === 'light' ? 'light' : 'dark';

  return (
    <DropdownMenu modal={false} orientation="horizontal">
      <DropdownMenuTrigger className="site-icon-button" aria-label="配色主题" title="配色主题">
        <Palette size={18} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-72 max-w-[calc(100vw-1.5rem)]" aria-label="配色主题">
        <DropdownMenuRadioGroup className="grid grid-cols-5 gap-1" value={selected}
          onValueChange={(value: AccentThemeId) => setAccentTheme(value)}>
          {accentThemeIds.map(id => {
            const theme = accentThemes[id];
            const Icon = accentIcons[id];
            return (
              <DropdownMenuRadioItem key={id} value={id} closeOnClick
                className="min-h-16 flex-col justify-center gap-1.5 px-0.5 pe-0.5 py-2 text-xs data-checked:bg-fd-accent [&>[data-slot=dropdown-menu-radio-item-indicator]]:hidden">
                <Icon size={19} color={theme[mode].accent} aria-hidden="true" />
                <span className="whitespace-nowrap">{theme.label}</span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
