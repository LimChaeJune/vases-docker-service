import { BaseEntity } from '../BaseEntity';

export type UserMetaJson = {
  test: string;
};

export type UserSchema = {
  idx: number;
  type: string;
  email: string;
  pwd: string;
  name: string;
  meta_json: string | UserMetaJson;
  updated_time: number;
  created_time: number;
};

export class UserEntity extends BaseEntity<UserSchema> {
  constructor(tableName: string = 'saige_user') {
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
        default: BaseEntity.database.fn.now(),
      },
      created_time: {
        type: 'timestamp',
        options: [
          {
            precision: 6,
          },
        ],
        index: ['idx_created_time'],
        default: BaseEntity.database.fn.now(),
      },
    });
  }
}
