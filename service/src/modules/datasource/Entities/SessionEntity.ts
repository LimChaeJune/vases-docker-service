import { BaseEntity } from '../BaseEntity';

type SessionSchema = {
  idx: number;
  sid: string;
  sess: string;
  expired: number
}

export class SessionEntity extends BaseEntity<SessionSchema> {
  constructor(tableName: string = 'saige_session') {
    super(tableName, {
      idx: {
        type: 'increments',
        comment: 'index field',
      },
      sid : {
        type :'string',
        unique:true,
        options: [255]
      },
      sess : {
        type :'text',
        notNullable:true
      },
      expired : {
        type :'timestamp',
        notNullable:true,
        options: [
          {
            precision: 6,
          },
        ],
        index:['idx_expired']
      }
    });
  }
}
