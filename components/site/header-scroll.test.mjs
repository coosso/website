import assert from 'node:assert/strict';
import { test } from 'node:test';
import { initialHeaderScroll, updateHeaderScroll } from './header-scroll.ts';
import * as headerScroll from './header-scroll.ts';

test('scrolling changes the navigation only on the home and about pages', () => {
  assert.equal(typeof headerScroll.isHeaderScrollEnabled, 'function');
  for (const path of ['/', '/about', '/about/team']) assert.equal(headerScroll.isHeaderScrollEnabled(path), true, path);
  for (const path of ['/blog', '/blog/example', '/notes', '/notes/example', '/aboutness']) assert.equal(headerScroll.isHeaderScrollEnabled(path), false, path);
});

test('the navigation stays expanded near the top and compacts after downward scrolling', () => {
  let state = initialHeaderScroll(0);
  state = updateHeaderScroll(state, 90);
  assert.equal(state.compact, false);
  state = updateHeaderScroll(state, 110);
  assert.equal(state.compact, true);
});

test('small reversals do not make the navigation flicker', () => {
  let state = initialHeaderScroll(300);
  for (const y of [296, 299, 295, 298]) state = updateHeaderScroll(state, y);
  assert.equal(state.compact, true);
  state = updateHeaderScroll(state, 280);
  assert.equal(state.compact, false);
});

test('upward scroll expands and the top always resets the navigation', () => {
  let state = initialHeaderScroll(400);
  assert.equal(state.compact, true);
  state = updateHeaderScroll(state, 380);
  assert.equal(state.compact, false);
  state = updateHeaderScroll(state, 600);
  assert.equal(state.compact, true);
  state = updateHeaderScroll(state, 0);
  assert.equal(state.compact, false);
});

test('fractional scroll movement accumulates instead of being ignored', () => {
  let state = initialHeaderScroll(100);
  state.compact = false;
  for (let i = 1; i <= 40; i++) state = updateHeaderScroll(state, 100 + i * 0.5);
  assert.equal(state.compact, true);
});
