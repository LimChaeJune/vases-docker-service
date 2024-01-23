"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionEntity = void 0;
const BaseEntity_1 = require("../BaseEntity");
class SessionEntity extends BaseEntity_1.BaseEntity {
    constructor(tableName = 'saige_session') {
        super(tableName, {
            idx: {
                type: 'increments',
                comment: 'index field',
            },
            sid: {
                type: 'string',
                unique: true,
                options: [255]
            },
            sess: {
                type: 'text',
                notNullable: true
            },
            expired: {
                type: 'timestamp',
                notNullable: true,
                options: [
                    {
                        precision: 6,
                    },
                ],
                index: ['idx_expired']
            }
        });
    }
}
exports.SessionEntity = SessionEntity;
//# sourceMappingURL=SessionEntity.js.map