import winston from "winston";

export enum LogLevelsEnum {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  DEBUG = "debug",
}

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
      level: "debug",
    }),
  ],
});

export function setLogLevel(level: LogLevelsEnum) {
  for (const transport of logger.transports) {
    transport.level = level;
  }
}
