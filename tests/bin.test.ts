import assert from "node:assert/strict";
import { type SpawnSyncReturns, spawnSync } from "node:child_process";
import { describe, test } from "node:test";
import { ExitCodesEnum, ROOT_DIR } from "@/constants.js";
import { logger } from "@/logger.js";
import pkg from "~/package.json";

function runWithArgs(args: string): SpawnSyncReturns<Buffer> {
  const result = spawnSync(`${BIN_ARGS} ${args}`, {
    cwd: ROOT_DIR,
    shell: true,
  });
  if (result.status !== ExitCodesEnum.SUCCESS) {
    logger.info(`
# --- Output (${args}) --- #`);
    const lines = [`Status: ${result.status}`];
    if (result.stdout && result.stdout.toString().trim() !== "") {
      lines.push(`Stdout:\n${result.stdout.toString().trim()}`);
    }
    if (result.stderr && result.stderr.toString().trim() !== "") {
      lines.push(`Stderr:\n${result.stderr.toString().trim()}`);
    }
    logger.warning(lines.join("\n"));
    logger.info("\n# --- END Command Output --- #\n");
  }
  return result;
}

const BIN_ARGS = "pnpm exec wrangle";
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
