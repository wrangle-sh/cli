import fs from "node:fs";
import path from "node:path";
import * as url from "node:url";
import markdownit from "markdown-it";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export enum RuleCategory {
  ACCESSIBILITY = "Accessibility",
  COMPLEXITY = "Complexity",
  CORRECTNESS = "Correctness",
  PERFORMANCE = "Performance",
  SECURITY = "Security",
  STYLE = "Style",
}

function getTitleMatch(line: string): string | undefined {
  return line.match(/## (.*)/)?.[1];
}

type BiomeRule = {
  category: RuleCategory;
  name: string;
  url: string;
  description: string;
};
export function getBiomeRules(): BiomeRule[] {
  let currentSection = "";
  const rules: BiomeRule[] = [];
  const contents = fs.readFileSync(
    path.resolve(__dirname, "rules.md"),
    "utf-8",
  );
  for (const line of contents.split("\n")) {
    const titleMatch = getTitleMatch(line);
    if (titleMatch !== undefined) {
      currentSection = titleMatch;
    }

    const match = /\| \[([\w-]+)\]\(([^)]+)\) \| ([^\|]+) \|/.exec(line);
    if (match) {
      rules.push({
        category: currentSection as RuleCategory,
        name: match[1],
        url: match[2],
        description: match[3],
      });
    }
  }
  return rules;
}
