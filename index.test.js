import assert from "node:assert/strict";
import { test } from "node:test";
import { testFn } from "./test-module.js";

test("default implementation", () => {
	assert.deepEqual(testFn("a", "b", "c"), ["a", "b", "c"]);
});

test("tOverride implementation", (t) => {
	const mockFn = testFn.tOverride(t, (...args) =>
		args.map((arg) => `${arg}, yo`),
	);

	assert.deepEqual(testFn("a", "b", "c"), ["a, yo", "b, yo", "c, yo"]);
	assert.equal(mockFn.mock.calls.length, 1);
});

test("override implementation", () => {
	testFn.override((...args) => args.map((arg) => `${arg}, yo`));
	assert.deepEqual(testFn("a", "b", "c"), ["a, yo", "b, yo", "c, yo"]);
	testFn.clear();
});
