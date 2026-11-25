import assert from 'node:assert/strict';
import { test } from 'node:test';
import { initialHeaderScroll, updateHeaderScroll } from './header-scroll.ts';
import * as headerScroll from './header-scroll.ts';

test('scrolling changes the navigation only on the home and about pages', () => {
  assert.equal(typeof headerScroll.isHeaderScrollEnabled, 'function');
  for (const path of ['/', '/about', '/about/team']) assert.equal(headerScroll.isHeaderScrollEnabled(path), true, path);
  for (const path of ['/blog', '/blog/example', '/notes', '/notes/example', '/aboutness']) assert.equal(headerScroll.isHeaderScrollEnabled(path), false, path);
});

test('downward scrolling compacts immediately at the top', () => {
  let state = initialHeaderScroll(0);
  assert.equal(state.compact, false);
  state = updateHeaderScroll(state, 1);
  assert.equal(state.compact, true);
});

test('small direction changes switch the navigation immediately', () => {
  let state = updateHeaderScroll(initialHeaderScroll(300), 299);
  assert.equal(state.compact, false);
  assert.equal(updateHeaderScroll(state, 299).compact, false);
  state = updateHeaderScroll(state, 300);
  assert.equal(state.compact, true);
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

test('fractional movement and restored positions work near the top', () => {
  assert.equal(updateHeaderScroll(initialHeaderScroll(0), 0.5).compact, true);
  assert.equal(initialHeaderScroll(0.5).compact, true);
});
