import { describe, it, mock } from "node:test";
import {
  calledOnce,
  calledTimes,
  calledWith,
  notCalled,
} from "./assertions.js";

describe("notCalled", () => {
  it("succeeds when not called", () => {
    const mockFn = mock.fn(() => null);

    notCalled(mockFn);
  });
});

describe("calledOnce", () => {
  it("succeeds when called", () => {
    const mockFn = mock.fn(() => null);

    mockFn();
    calledOnce(mockFn);
  });
});

describe("calledTimes", () => {
  it("succeeds when called multiple times", () => {
    const mockFn = mock.fn(() => null);

    mockFn();
    mockFn();
    calledTimes(mockFn, 2);
  });
});

describe("calledWith", () => {
  it("succeeds when called with expected arguments", () => {
    const mockFn = mock.fn(() => null);

    mockFn("a", "b", "c");
    mockFn("d", "e", "f");

    calledWith(mockFn, "a", "b", "c");
  });
});
