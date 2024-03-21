import { GlobalConfig } from '@app/configure';
import { UserSchema } from '@vases/datasource';
import { Knex } from 'knex';
import WebSocket from 'ws';

export {};

declare global {
  var config: GlobalConfig;
  var knex: Knex;

  namespace Express {
    export interface User extends UserSchema {
      send?: (msg: string, targets?: number[]) => void;
    }
  }

  export interface ExtendedWebSocket extends WebSocket {
    user?: UserSchema;
  }
}
