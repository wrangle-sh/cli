/**
 * General logger used for normal program output.
 * This is streamed to `stderr`, as `stdout` is supposed to be reserved for the actual programmatic output of the program. As we want to expose the output of this program as structured JSON that can then be fed into other systems, this drastically simplifies that.
 */

import winston from "winston";

import type { LogLevelsEnum } from "@/loggers/common.js";

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.align(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      level: "debug",
      stderrLevels: ["error", "warn", "warning", "info", "debug"], // everything
    }),
  ],
});

export function setLogLevel(level: LogLevelsEnum) {
  for (const transport of logger.transports) {
    transport.level = level;
  }
}

export function setLogFormatToJson() {
  for (const transport of logger.transports) {
    transport.format = winston.format.json();
  }
}
