import assert from "node:assert/strict";
import { type SpawnSyncReturns, spawnSync } from "node:child_process";
import { describe, test } from "node:test";
import { ExitCodesEnum, ROOT_DIR } from "@/constants.js";
import pkg from "~/package.json";

function runWithOptions(options: string): SpawnSyncReturns<Buffer> {
  const result = spawnSync(`pnpm exec tsx ${pkg.bin} ${options}`, {
    cwd: ROOT_DIR,
    shell: true,
  });
  console.log(`\nTest Details (${options})`);
  console.log(`Status: ${result.status?.toString().trim()}`);
  console.log(`stdout: ${result.stdout?.toString().trim()}`);
  console.log(`stderr: ${result.stderr?.toString().trim()}`);
  return result;
}

test("--version", () => {
  const result = runWithOptions("--version");
  assert(result.stdout.toString().includes(pkg.version));
});

describe("File List", () => {
  describe("Positive Scenarios", () => {
    test("One file provided", () => {
      const result = runWithOptions("analyze --files examples/hello-world.ts");
      assert.equal(result.status, ExitCodesEnum.SUCCESS);
    });

    test("Multiple files provided", () => {
      const result = runWithOptions(
        "analyze --files examples/hello-world.ts examples/hello-world-2.ts",
      );
      assert.equal(result.status, ExitCodesEnum.SUCCESS);
    });
  });

  describe("Negative Scenarios", () => {
    test("Nonexistent file provided => nonzero code", () => {
      const result = runWithOptions(
        "analyze --files examples/nonexistent-file.ts",
      );
      assert.equal(result.status, ExitCodesEnum.SUCCESS);
    });

    test("Zero files supplied => nonzero code", () => {
      const result = runWithOptions("analyze");
      assert.notEqual(result.status, ExitCodesEnum.SUCCESS);
    });
  });
});
