"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
commander_1.program
    .option('-c, --conf [conf]', 'set config', './config.json')
    .parse(process.argv);
const opts = commander_1.program.opts();
// 사용자 정의 config
var relative_path = path_1.default.relative(__dirname, './');
var config = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, relative_path, opts.conf), 'utf8'));
exports.default = () => {
    return config;
};
//# sourceMappingURL=configure.js.map