import type { LogLevelsEnum } from "@/loggers/common.js";
import winston from "winston";

export const diagnosticsLogger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.align(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
      level: "debug",
      stderrLevels: [], // nothing! all goes to stdout, as this is for the actual command output
    }),
  ],
});

export function setLogLevelDiagnostics(level: LogLevelsEnum) {
  for (const transport of diagnosticsLogger.transports) {
    transport.level = level;
  }
}
