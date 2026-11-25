export function isHeaderScrollEnabled(pathname: string): boolean {
  return pathname === '/' || pathname === '/about' || pathname.startsWith('/about/');
}

export type HeaderScrollState = {
  y: number;
  compact: boolean;
};

export function initialHeaderScroll(y: number): HeaderScrollState {
  const position = Math.max(0, y);
  return { y: position, compact: position > 0 };
}

export function updateHeaderScroll(state: HeaderScrollState, y: number): HeaderScrollState {
  const position = Math.max(0, y);
  if (position === state.y) return state;
  return { y: position, compact: position > state.y };
}
