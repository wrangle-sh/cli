import assert from "node:assert";
import { describe, test } from "node:test";
import { Mappers } from "@/external/base.js";

describe("Mapper extensions start with `.`", () => {
  for (const mapper of Mappers) {
    test(mapper.constructor.name, () => {
      assert(mapper.supportedExtensions.every((ext) => ext.startsWith(".")));
    });
  }
});
