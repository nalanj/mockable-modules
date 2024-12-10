import assert from "node:assert/strict";
import { test } from "node:test";
import { testFn } from "./sample-module.js";

test("default implementation", () => {
  assert.deepEqual(testFn("a", "b", "c"), ["a", "b", "c"]);
});

test("override implementation", (t) => {
  const mockFn = testFn.override(t, (...args) =>
    args.map((arg) => `${arg}, yo`),
  );

  assert.deepEqual(testFn("a", "b", "c"), ["a, yo", "b, yo", "c, yo"]);
  assert.equal(mockFn.mock.calls.length, 1);
});

test("empty override", (t) => {
  const mockFn = testFn.override(t);

  assert.deepEqual(testFn("a", "b", "c"), undefined);
  assert.equal(mockFn.mock.calls.length, 1);
});
