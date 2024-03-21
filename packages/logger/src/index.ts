import fs from "fs";
import path from "path";
import winston, { Logger as _Logger } from "winston";
import "winston-daily-rotate-file";
import moment from "moment";

const logDir = path.resolve(__dirname, "./logs");
const logFileName = path.resolve(logDir, "./logfile.log");

const { combine, timestamp, printf } = winston.format;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const myFormat = printf((info) => {
  return `${moment(info.timestamp).format("YYYY-MM-DD HH:mm:ss")} [${
    info.level
  }] : ${info.message}`;
});

export type Logger = _Logger;

export const logger = winston.createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.DailyRotateFile({
      filename: logFileName,
      maxSize: 10485760, //10mb
      maxFiles: 50, //50개
    }),
  ],
});
