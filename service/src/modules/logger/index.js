"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const moment_1 = __importDefault(require("moment"));
const logDir = path_1.default.resolve(__dirname, './logs');
const logFileName = path_1.default.resolve(logDir, './logfile.log');
const { combine, timestamp, printf } = winston_1.default.format;
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
const myFormat = printf((info) => {
    return `${(0, moment_1.default)(info.timestamp).format('YYYY-MM-DD HH:mm:ss')} [${info.level}] : ${info.message}`;
});
exports.default = winston_1.default.createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
        new winston_1.default.transports.Console({
            level: 'info',
        }),
        new winston_1.default.transports.DailyRotateFile({
            filename: logFileName,
            maxSize: 10485760, //10mb
            maxFiles: 50, //50개
        }),
    ],
});
//# sourceMappingURL=index.js.map