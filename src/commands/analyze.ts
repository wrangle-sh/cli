import path from "node:path";
import { ExitCodesEnum } from "@/constants.js";
import { Mappers } from "@/external/base.js";
import { logger } from "@/loggers/program.js";
import { type RuleViolation, SeverityLevelsEnum } from "@/model.js";
import chalk from "chalk";

async function handleFile(file: string): Promise<RuleViolation[]> {
  const ext = path.extname(file);
  logger.debug(`Analyzing file ${file} with extension ${ext}`);
  const applicableMappers = Mappers.filter((mapper) =>
    mapper.supportedExtensions.includes(path.extname(file)),
  );
  logger.debug(
    `File ${file} has ${applicableMappers.length} applicable mapper(s)`,
  );
  const ruleInstances = await Promise.all(
    applicableMappers.map((mapper) => mapper.analyze(file)),
  );
  return ruleInstances.flat();
}

function getColoredOutputForSeverity(severity: SeverityLevelsEnum): string {
  switch (severity) {
    case SeverityLevelsEnum.NIT:
      return chalk.white(severity.toString().toUpperCase());
    case SeverityLevelsEnum.MINOR:
      return chalk.yellow(severity.toString().toUpperCase());
    case SeverityLevelsEnum.MAJOR:
      return chalk.red(severity.toString().toUpperCase());
    case SeverityLevelsEnum.CRITICAL:
      return chalk.redBright(severity.toString().toUpperCase());
  }
}

export async function analyze(params: { files: string[] }) {
  logger.debug(
    `Analyzing ${params.files.length} files:\n${params.files.join("\n")}`,
  );

  const ruleInstances = (
    await Promise.all(params.files.map((file) => handleFile(file)))
  ).flat();
  logger.debug(`Found ${ruleInstances.length} rule instances`);

  for (const instance of ruleInstances) {
    logger.info(
      `${getColoredOutputForSeverity(instance.rule.severity)} [${instance.location.file} ${instance.location.line}:${instance.location.column}] | ${instance.rule.identifier.source}/${instance.rule.identifier.slug} | ${instance.rule.message}`,
    );
  }

  if (ruleInstances.length > 0) {
    process.exit(ExitCodesEnum.HANDLED_ERROR);
  }
}
