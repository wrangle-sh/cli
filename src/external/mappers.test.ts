import { Mappers } from "@/external/base.js";
import { assert, describe, test } from "vitest";

describe("Mapper extensions start with `.`", () => {
  for (const mapper of Mappers) {
    test(mapper.constructor.name, () => {
      assert(mapper.supportedExtensions.every((ext) => ext.startsWith(".")));
    });
  }
});
