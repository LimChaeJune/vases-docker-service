import { BaseEntity } from "../BaseEntity";


export type PriceSchema = {
  idx: number;
  open:number;
  low: number;
  high: number;
  close: number;
  volume: number;
  volume_rate: number;
  date: number;
}

export class PriceEntity extends BaseEntity<PriceSchema> {
  constructor(tableName = 'vases_price_{stock_code}') {
    super(tableName, {
      idx: {
        type: "increments",
        comment: "index field",
      },
      open: {
        type: "integer",
      },
      low: {
        type: "integer",
      },
      high: {
        type: "integer",
      },
      close: {
        type: "integer",
      },
      volume: {
        type: "integer",
      },
      volume_rate: {
        type: 'integer'
      },
      date: {
        type: "integer",
        unique: true,
        comment: "예시: 20110101"
      },
    })
  }
}