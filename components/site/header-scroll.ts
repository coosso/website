const TOP_ZONE = 96;
const DIRECTION_DISTANCE = 14;

export function isHeaderScrollEnabled(pathname: string): boolean {
  return pathname === '/' || pathname === '/about' || pathname.startsWith('/about/');
}

export type HeaderScrollState = {
  y: number;
  direction: -1 | 0 | 1;
  distance: number;
  compact: boolean;
};

export function initialHeaderScroll(y: number): HeaderScrollState {
  const position = Math.max(0, y);
  return { y: position, direction: 0, distance: 0, compact: position > TOP_ZONE };
}

/** Require sustained movement before switching modes, so trackpad jitter cannot flicker the header. */
export function updateHeaderScroll(state: HeaderScrollState, y: number): HeaderScrollState {
  const position = Math.max(0, y);
  if (position <= TOP_ZONE) return { y: position, direction: 0, distance: 0, compact: false };
  const delta = position - state.y;
  if (delta === 0) return state;
  const direction = delta > 0 ? 1 : -1;
  const distance = (direction === state.direction ? state.distance : 0) + Math.abs(delta);
  return {
    y: position,
    direction,
    distance: distance >= DIRECTION_DISTANCE ? 0 : distance,
    compact: distance >= DIRECTION_DISTANCE ? direction === 1 : state.compact,
  };
}
