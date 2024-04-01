import type { IntegrationMapper } from "@/external/base.js";
import { eslintRecommended } from "@/external/eslint/data/eslint-recommended.js";
import {
  type RuleInstance,
  RuleSourcesEnum,
  SeverityLevelsEnum,
} from "@/model.js";
import { coerceToRuleSlug } from "@/utils.js";
import eslint from "eslint";

export class ESLintIntegrationMapper implements IntegrationMapper {
  supportedExtensions: string[] = [
    ".js",
    ".ts",
    ".mjs",
    ".mts",
    ".cjs",
    ".cts",
    ".jsx",
    ".tsx",
  ];

  async analyze(filepath: string): Promise<RuleInstance[]> {
    const instance = new eslint.ESLint({
      useEslintrc: false,
      overrideConfig: {
        extends: ["eslint:all"],
      },
    });
    const results = await instance.lintFiles([filepath]);
    return results
      .flatMap((result) => result.messages)
      .filter((message) => message.ruleId !== undefined)
      .map((message) => {
        const ruleId = message.ruleId as string;
        return {
          rule: {
            message: message.message,
            severity: this.getSeverity(ruleId),
            identifier: {
              source: RuleSourcesEnum.ESLINT,
              slug: coerceToRuleSlug(message.message),
            },
          },
          location: {
            file: filepath,
            line: message.line,
            column: message.column,
          },
        } satisfies RuleInstance;
      });
  }

  /**
   * Given an ESLint rule identifier, return what severity it should be in our system. Relies primarily on a heuristic of which ESLint "presets" a given ESLint rule is in.
   */
  private getSeverity(identifier: string): SeverityLevelsEnum {
    if (Object.keys(eslintRecommended).includes(identifier)) {
      return SeverityLevelsEnum.MAJOR;
    }
    return SeverityLevelsEnum.MINOR;
  }
}
