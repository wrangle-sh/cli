import fs from "node:fs";
import { analyze } from "@/commands/analyze.js";
import { ExitCodesEnum } from "@/constants.js";
import { LogLevelsEnum, logger, setLogLevel } from "@/logger.js";
import { SeverityLevelsEnum } from "@/model.js";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { z } from "zod";
import pkg from "~/package.json";

export function parseArgs() {
  return yargs(hideBin(process.argv))
    .version(pkg.version)
    .options({
      "log-level": {
        type: "string",
        description: "Log Level",
        choices: Object.values(LogLevelsEnum),
        default: LogLevelsEnum.INFO,
      },
      "minimum-severity": {
        type: "string",
        description: "Minimum Severity",
        choices: Object.values(SeverityLevelsEnum),
        default: SeverityLevelsEnum.NIT,
      },
      files: {
        type: "array",
        description:
          "List of files to analyze. Mandatory if running `analyze` command.",
        default: [],
      },
    })
    .middleware((argv) => {
      setLogLevel(argv.logLevel);
    })
    .command(
      "analyze",
      "runs analysis",
      () => {},
      (argv) => {
        const files = z.array(z.string()).min(1).safeParse(argv.files);
        if (!files.success) {
          if (files.error.errors.find((err) => err.code === "too_small")) {
            logger.error("At least one file must be provided.");
            process.exit(ExitCodesEnum.HANDLED_ERROR);
          }
          process.exit(ExitCodesEnum.UNHANDLED_ERROR);
        }
        for (const file of files.data) {
          try {
            fs.readFileSync(file);
          } catch (err: unknown) {
            if (err instanceof Error) {
              logger.error(`Unable to find file: ${file}.`);
              process.exit(ExitCodesEnum.HANDLED_ERROR);
            }
            throw err;
          }
        }
        analyze({ files: files.data });
      },
    )
    .strict()
    .parseSync();
}
