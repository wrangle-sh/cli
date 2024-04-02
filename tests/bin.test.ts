import assert from "node:assert/strict";
import { type SpawnSyncReturns, spawnSync } from "node:child_process";
import { describe, test } from "node:test";
import { ExitCodesEnum, ROOT_DIR } from "@/constants.js";
import { logger } from "@/logger.js";
import pkg from "~/package.json";

const BIN_ARGS = "pnpm exec wrangle";

function runWithArgs(args: string): SpawnSyncReturns<Buffer> {
  return spawnSync(`${BIN_ARGS} ${args}`, {
    cwd: ROOT_DIR,
    shell: true,
  });
}

test("--version", () => {
  const result = runWithArgs("--version");
  assert(result.stdout.toString().includes(pkg.version));
});

describe("File List", () => {
  describe("Positive Scenarios", () => {});

  describe("Negative Scenarios", () => {
    test("One file provided with errors", () => {
      const result = runWithArgs("analyze --files examples/hello-world.ts");
      assert.equal(result.status, ExitCodesEnum.HANDLED_ERROR);
    });

    test("Multiple files provided (at least one error, collectively)", () => {
      const result = runWithArgs(
        "analyze --files examples/hello-world.ts examples/hello-world-2.ts",
      );
      assert.equal(result.status, ExitCodesEnum.HANDLED_ERROR);
    });
    test("Nonexistent file provided => nonzero code", () => {
      const result = runWithArgs(
        "analyze --files examples/nonexistent-file.ts",
      );
      assert.notEqual(result.status, ExitCodesEnum.SUCCESS);
    });

    test("Zero files supplied => nonzero code", () => {
      const result = runWithArgs("analyze");
      assert.notEqual(result.status, ExitCodesEnum.SUCCESS);
    });
  });
});
