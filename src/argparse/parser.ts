import fs from "node:fs";
import { resolveFilesAndDirectoriesToFiles } from "@/argparse/utils.js";
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
        description: "List of files to analyze.",
        default: [],
      },
    })
    .middleware((argv) => {
      setLogLevel(argv.logLevel);
    })
    .command(
      "analyze [files..]",
      "runs analysis",
      (yargs) => {
        yargs.positional("files", {
          type: "string",
          description: "List of files to analyze",
        });
      },
      (argv) => {
        if (argv.files.length === 0) {
          logger.error("No files provided.");
          process.exit(ExitCodesEnum.HANDLED_ERROR);
        }
        const files = resolveFilesAndDirectoriesToFiles(
          z.array(z.string()).parse(argv.files),
        );
        analyze({ files });
      },
    )
    .strict()
    .parseSync();
}
