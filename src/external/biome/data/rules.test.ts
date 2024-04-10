import { getBiomeRules } from "@/external/biome/data/rules.js";
import { describe, expect, test } from "vitest";

describe("getRules", () => {
  test("Happy Path", () => {
    const rules = getBiomeRules();
    expect(rules.length).toBeGreaterThan(0);
  });
});
