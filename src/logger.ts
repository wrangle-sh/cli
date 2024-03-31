import winston from "winston";

export enum LogLevelsEnum {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  DEBUG = "debug",
}

export const logger = winston.createLogger({
  format: winston.format.colorize(),
  transports: [new winston.transports.Console()],
});

export function setLogLevel(level: LogLevelsEnum) {
  for (const transport of logger.transports) {
    transport.level = level;
  }
}
