import { GlobalConfig } from '@app/configure';
import { UserSchema } from '@app/modules/datasource/Entities';
import { Knex } from 'knex';

declare global {
  var config: GlobalConfig;
  var knex: Knex;
  namespace Express {
    export interface User extends UserSchema {}
  }
}

export {};
