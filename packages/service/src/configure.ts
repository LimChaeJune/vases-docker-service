import fs from 'fs';
import path from 'path';

import { program } from 'commander';
program
  .option('-c, --conf [conf]', 'set config', './config.json')
  .parse(process.argv);

const opts = program.opts();

export type ClientMap = {
  'better-sqlite3': {
    filename: string;
  };
  mysql: {
    host: string;
    user: string;
    password: string;
    database: string;
  };
  pg: {
    host: string;
    user: string;
    password: string;
    database: string;
  };
};

export interface DataConnectorOptions<K extends keyof ClientMap> {
  client: K;
  connection: ClientMap[K];
}

export type GlobalConfig = {
  root_path: string;
  host: string;
  port: number;
  session_time: number;
  database: DataConnectorOptions<'better-sqlite3' | 'mysql' | 'pg'>;
  google_auto: {
    id: string;
    secret: string;
    domain: string;
  };
  smtp: {
    service: string;
    host: string;
    auth: {
      user: string;
      pass: string;
    };
  };
};

// 사용자 정의 config
var relative_path = path.relative(__dirname, './');
var config = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, relative_path, opts.conf), 'utf8')
) as GlobalConfig;

export default () => {
  return config;
};
