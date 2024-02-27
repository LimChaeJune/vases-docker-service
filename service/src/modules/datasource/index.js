'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DataConnector = void 0;
const knex_1 = __importDefault(require('knex'));
const BaseEntity_1 = require('./BaseEntity');
const Entities_1 = require('./Entities');
class DataConnector {
  constructor(options) {
    this.connected = false;
    console.log(options);
    if (options) {
      this.config = options;
    }
  }
  connect() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield new Promise((resolve, reject) => {
        var timeoutId;
        this.database = (0, knex_1.default)({
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
    });
  }
  initialize() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.connected) return;
      BaseEntity_1.BaseEntity.database = this.database;
      const user = new Entities_1.UserEntity();
      const session = new Entities_1.SessionEntity();
      yield user.drop();
      yield session.drop();
      yield user.create();
      yield session.create();
      yield user.query.truncate();
      yield user.query.insert({
        email: 'admin@vases.ai',
        pwd: 'admin8282',
        type: 'admin',
        name: '관리자',
      });
    });
  }
  entity(tableName) {
    return this.entities[tableName];
  }
  addEntity(entity) {
    this.entities[entity.tableName] = entity;
  }
}
exports.DataConnector = DataConnector;
//# sourceMappingURL=index.js.map
