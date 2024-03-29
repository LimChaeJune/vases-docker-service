import { BaseEntity } from "../BaseEntity";

export type TradeSchema = {
  idx?: number;
  stock_code: string;
  type : 'buy' | 'cell';
  price: number;
  trade_time: number;
}

export class TradeEntity extends BaseEntity<TradeSchema> {
  constructor(tableName = 'vases_trade')  {
    super(tableName, {
      idx: {
        type:'increments'
      },
      stock_code: {
        type: 'string'
      },
      type: {
        type:'string'
      },
      price: {
        type:'integer',
      },
      trade_time: {
        type:'timestamp'
      }
    })
  }
}