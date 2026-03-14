import assert from "node:assert/strict";

import { getLocaleSwitchTargetPath } from "../lib/locale.ts";

assert.equal(
  getLocaleSwitchTargetPath("/", "", ""),
  "/",
  "switching on the home page should stay on the unprefixed home path",
);

assert.equal(
  getLocaleSwitchTargetPath("/ja/slug", "", ""),
  "/slug",
  "SEO locale paths should switch back to the matching unprefixed path",
);

assert.equal(
  getLocaleSwitchTargetPath("/tool", "?tab=examples", "#output"),
  "/tool?tab=examples#output",
  "switching locale should preserve search params and hash fragments",
);

console.log("locale switch target path assertions passed");
