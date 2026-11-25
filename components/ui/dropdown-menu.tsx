'use client';

// shadcn/ui Base UI dropdown menu, with the site's Fumadocs color tokens.
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export function DropdownMenu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

export function DropdownMenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

export function DropdownMenuContent({
  align = 'start',
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props & Pick<MenuPrimitive.Positioner.Props, 'align' | 'sideOffset'>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner align={align} side="bottom" sideOffset={sideOffset}
        className="isolate z-[72] outline-none data-anchor-hidden:invisible">
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={state => cn(
            'max-h-(--available-height) min-w-40 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-fd-border bg-fd-popover p-1 text-sm text-fd-popover-foreground shadow-md outline-none',
            'data-open:animate-fd-popover-in data-closed:animate-fd-popover-out',
            typeof className === 'function' ? className(state) : className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

export function DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

export function DropdownMenuRadioItem({ children, className, ...props }: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={state => cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 pe-8 outline-none',
        'data-highlighted:bg-fd-accent data-highlighted:text-fd-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        typeof className === 'function' ? className(state) : className,
      )}
      {...props}
    >
      <span data-slot="dropdown-menu-radio-item-indicator" className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <Check size={15} aria-hidden="true" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}
