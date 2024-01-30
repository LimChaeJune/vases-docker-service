"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const BaseEntity_1 = require("../BaseEntity");
class UserEntity extends BaseEntity_1.BaseEntity {
    constructor(tableName = 'saige_user') {
        super(tableName, {
            idx: {
                type: 'increments',
                comment: 'index field',
            },
            type: {
                type: 'string',
                options: [50],
                default: 'local',
            },
            name: {
                type: 'string',
                options: [50],
            },
            email: {
                type: 'string',
                options: [255],
                unique: true,
                index: ['index_emaii'],
            },
            pwd: {
                type: 'string',
                options: [50],
            },
            meta_json: {
                type: 'text',
            },
            updated_time: {
                type: 'timestamp',
                options: [
                    {
                        precision: 6,
                    },
                ],
                index: ['idx_created_time'],
                default: BaseEntity_1.BaseEntity.database.fn.now(),
            },
            created_time: {
                type: 'timestamp',
                options: [
                    {
                        precision: 6,
                    },
                ],
                index: ['idx_created_time'],
                default: BaseEntity_1.BaseEntity.database.fn.now(),
            },
        });
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=UserEntity.js.map