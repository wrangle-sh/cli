import { execSync } from "node:child_process";
import type { IntegrationMapper } from "@/external/base.js";
import {
  RuleSourcesEnum,
  type RuleViolation,
  SeverityLevelsEnum,
} from "@/model.js";
import { coerceToRuleSlug } from "@/utils.js";

import { logger } from "@/loggers/program.js";

export class BiomeIntegrationMapper implements IntegrationMapper {
  supportedExtensions: string[] = [
    ".js",
    ".ts",
    ".mjs",
    ".mts",
    ".cjs",
    ".cts",
    ".jsx",
    ".tsx",
    ".json",
    ".jsonc",
  ];

  async analyze(filepath: string): Promise<RuleViolation[]> {
    const cliResult = execSync(`biome lint ${filepath}`).toString();
    logger.info(cliResult);
    // const instance = new eslint.Biome({
    //   useEslintrc: false,
    //   overrideConfig: {
    //     extends: ["eslint:all"],
    //   },
    // });
    // const results = await instance.lintFiles([filepath]);
    // return results
    //   .flatMap((result) => result.messages)
    //   .filter((message) => message.ruleId !== undefined)
    //   .map((message) => {
    //     const ruleId = message.ruleId as string;
    //     return {
    //       rule: {
    //         message: message.message,
    //         severity: this.getSeverity(ruleId),
    //         identifier: {
    //           source: RuleSourcesEnum.ESLINT,
    //           slug: coerceToRuleSlug(message.message),
    //         },
    //       },
    //       location: {
    //         file: filepath,
    //         line: message.line,
    //         column: message.column,
    //       },
    //     } satisfies RuleViolation;
    //   });
  }

  /**
   * Given an Biome rule identifier, return what severity it should be in our system. Relies primarily on a heuristic of which Biome "presets" a given Biome rule is in.
   */
  private getSeverity(identifier: string): SeverityLevelsEnum {
    const found = ESLINT_RULES.types.problem.find(
      (elem) => identifier === elem.name,
    );
    if (found) {
      return found.recommended
        ? SeverityLevelsEnum.MAJOR
        : SeverityLevelsEnum.MINOR;
    }
    return SeverityLevelsEnum.NIT;
  }
}
