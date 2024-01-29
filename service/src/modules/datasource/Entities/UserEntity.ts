import { BaseEntity } from '../BaseEntity';

export type UserSchema = {
  idx: number;
  type: string;
  email: string;
  pwd: string;
  name: string;
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
