import path from 'path';
import knex, { Knex } from 'knex';
import { BaseEntity } from './BaseEntity';
import { UserEntity, SessionEntity } from './Entities';

export class DataConnector {
  connected: boolean;
  database: Knex;
  private config: { client: string; connection: any };
  private entities: Record<string, BaseEntity<unknown>>;

  constructor(options?: { client: string; connection: any }) {
    this.connected = false;
    console.log(options);
    if (options) {
      this.config = options;
    }
  }

  async connect() {
    return await new Promise((resolve, reject) => {
      var timeoutId: NodeJS.Timeout;
      this.database = knex({
        client: this.config.client,
        connection: this.config.connection,
        pool: { min: 0, max: 10 },
        useNullAsDefault: true,
      });

      var ping = () => {
        clearTimeout(timeoutId);
        this.database
          .raw('select 1')
          .then((a) => {
            this.connected = true;
            resolve(this.database);
          })
          .catch((err) => {
            console.log(err);
            console.log('database is not running...');
            timeoutId = setTimeout(ping, 1000);
          });
      };
      ping();
    });
  }

  async initialize() {
    if (!this.connected) return;
    BaseEntity.database = this.database;
    const user = new UserEntity();
    const session = new SessionEntity();

    await user.drop();
    await session.drop();

    await user.create();
    await session.create();

    await user.query.truncate();
    await user.query.insert({
      email: 'admin@saige.ai',
      pwd: 'admin8282',
      type: 'admin',
      name: '관리자',
    });
  }

  entity<T>(tableName: string) {
    return this.entities[tableName] as BaseEntity<T>;
  }

  addEntity<T>(entity: BaseEntity<T>) {
    this.entities[entity.tableName] = entity;
  }
}
