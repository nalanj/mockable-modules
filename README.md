# mockable-modules

A non-transpiling, non-configuration intense way to mock ES Modules for your
tests. Built specifically to work nicely with the native Node.js test runner.


## Install

```
npm install mockable-modules
```

## Usage

Some code to test:

```
import { unpredictableFunction } from "db";

export const unpredictable = mockable(unpredictableFunction);

export async function action() {
  const result = unpredictable();

  return result;
}
```

And a test:

```
import { unpredictable, action } from "./index.js";
import { assert } from "mockable-modules/assert";

test('synchronous passing test', (t) => {
  const mock = unpredictable.tOverride(t, () => {
    return 12;
  });

  assert.calledOnce(mock);
});
```
