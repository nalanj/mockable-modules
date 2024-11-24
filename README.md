# mockable-modules

A non-transpiling, non-configuration intense way to mock ES Modules for your
tests. Built specifically to work nicely with the native Node.js test runner.


## Install

```
npm install mockable-modules
```

## Usage

Some code to test:

```js
import { unpredictableFunction } from "db";

export const unpredictable = mockable(unpredictableFunction);

export async function action() {
	const result = unpredictable();

	return result;
}
```

And a test:

```js
import { assert } from "mockable-modules/assert";
import { action, unpredictable } from "./index.js";

test("synchronous passing test", (t) => {
	const mock = unpredictable.tOverride(t, () => {
		return 12;
	});

	assert.calledOnce(mock);
});
```

## Core API

### mockable(fn)

Wraps a function's implementation to make it `mockable`

Example:

```js
const mockableThing = mockable(thing);
```

### .override(t, fn)

Override a mockable within test context `t`. Returns `fn` wrapped as a `mock.fn`. Clears the mock automatically when the test context ends.

Example:

```
import { whatever } from "./target.js";

test("a test", (t) => {
  const mockFn = whatever.override(t, () => "yes");

  // do some things

  // assert some things
});
```

## Assertions

Mockable Modules includes two ways for importing assertions.

- `import assert from "mockable-modules"` - Wraps `node:assert/strict` to include the assertions from Mockable Modules.
- `import * as assertions from "mockable-modules/assertions"` - Import just the Mockable Modules assertions.

### assert.notCalled(mockFn)
