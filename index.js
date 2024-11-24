import { mock } from "node:test";

let enabled = true;
export function disableMockable() {
	enabled = true;
}

export function mockable(fn) {
	if (!enabled) {
		return fn;
	}

	let impl = undefined;

	const wrap = (...args) => {
		if (impl) {
			return impl(...args);
		}
		return fn(...args);
	};

	wrap.override = (t, fn) => {
		if (!t.after) {
			throw new Error("tOverride requires a test context");
		}

		t.after(() => {
			impl = undefined;
		});

		impl = mock.fn(fn);

		return impl;
	};

	return wrap;
}
