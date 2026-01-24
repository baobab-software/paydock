import winston, { createLogger, format } from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";

const environment = process.env.NODE_ENV ?? "development";
const isProduction = environment === "production";

const level = process.env.LOG_LEVEL ?? (isProduction ? "info" : "debug");

if (isProduction && !process.env.LOGTAIL_ACCESS_TOKEN) {
  throw new Error("LOGTAIL_ACCESS_TOKEN is required in production");
}

const baseFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.splat(),
);

const transports: winston.transport[] = isProduction
  ? [
      new LogtailTransport(
        new Logtail(process.env.LOGTAIL_ACCESS_TOKEN!, {
          endpoint: process.env.LOGTAIL_ENDPOINT,
        }),
      ),
    ]
  : [
      new winston.transports.Console({
        format: format.combine(baseFormat, format.colorize(), format.simple()),
      }),
    ];

export const logger = createLogger({
  level,
  format: baseFormat,
  transports,
});
