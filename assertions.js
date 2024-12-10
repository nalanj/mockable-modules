import { AssertionError } from "node:assert";
import { isDeepStrictEqual } from "node:util";

export function notCalled(mockFn) {
  if (mockFn.mock.calls.length !== 0) {
    throw new AssertionError({
      actual: mockFn.mock.calls.length,
      expected: 0,
      operator: "===",
      message: `Expected mock function not to be called, but it was called ${mockFn.mock.calls.length} times`,
      stackStartFn: notCalled,
    });
  }
}

export function calledOnce(mockFn) {
  if (mockFn.mock.calls.length !== 1) {
    throw new AssertionError({
      actual: mockFn.mock.calls.length,
      expected: 1,
      operator: "===",
      message: `Expected mock function to be called once, but it was called ${mockFn.mock.calls.length} times`,
      stackStartFn: calledOnce,
    });
  }
}

export function calledTimes(mockFn, times) {
  if (mockFn.mock.calls.length !== times) {
    throw new AssertionError({
      actual: mockFn.mock.calls.length,
      expected: times,
      operator: "===",
      message: `Expected mock function to be called ${times} times, but it was called ${mockFn.mock.calls.length} times`,
      stackStartFn: calledTimes,
    });
  }
}

export function calledWith(mockFn, ...args) {
  const found = mockFn.mock.calls.some((call) =>
    isDeepStrictEqual(call.arguments, args),
  );

  if (!found) {
    throw new AssertionError({
      actual: mockFn.mock.calls.map((call) => call.arguments),
      expected: args,
      operator: "calledWith",
      message: `Expected mock function to be called with [ ${args.map((arg) => arg.toString()).join(", ")} ], but it was called with ${mockFn.mock.calls.map((call) => `[ ${call.arguments.map((arg) => arg.toString()).join(", ")} ]`).join(",")}`,
      stackStartFn: calledWith,
    });
  }
}
