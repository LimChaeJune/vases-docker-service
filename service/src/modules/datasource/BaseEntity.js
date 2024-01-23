"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const lodash_1 = __importDefault(require("lodash"));
class BaseEntity {
    constructor(tableName, schema) {
        this.tableName = tableName;
        this.schema = schema;
    }
    create() {
        return BaseEntity.database.schema
            .hasTable(this.tableName)
            .then((exists) => {
            if (!exists) {
                var schema = this.schema;
                var table_name = this.tableName;
                return BaseEntity.database.schema.createTable(this.tableName, (t) => {
                    var indexer = {};
                    var unique_keys = [];
                    lodash_1.default.each(schema, (d, name) => {
                        console.log(d.type, name, d);
                        var column = t[d.type].apply(t, [name].concat(d.options));
                        if (d.default)
                            column.defaultTo(d.default);
                        if (d.unique)
                            unique_keys.push(name);
                        if (d.nullable)
                            column.nullable();
                        if (d.notNullable)
                            column.notNullable();
                        if (d.index && d.index.length > 0) {
                            lodash_1.default.each(d.index, (index_name, k) => {
                                if (indexer[table_name + '_' + index_name]) {
                                    indexer[table_name + '_' + index_name].push(name);
                                }
                                else {
                                    indexer[table_name + '_' + index_name] = [name];
                                }
                            });
                        }
                    });
                    if (unique_keys.length > 0)
                        t.unique(unique_keys);
                    lodash_1.default.each(indexer, (d, i) => {
                        t.index(d, i);
                    });
                });
            }
        })
            .catch((err) => {
            console.log('[' + this.tableName, ': initialize error] ', err);
        });
    }
    drop() {
        return BaseEntity.database.schema.dropTable(this.tableName);
    }
    clone(tableName) {
        return new BaseEntity(tableName, this.schema);
    }
    get query() {
        return BaseEntity.database(this.tableName);
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=BaseEntity.js.map