import assert from "node:assert/strict";
import * as assertions from "./assertions.js";

export default { ...assert, ...assertions };
