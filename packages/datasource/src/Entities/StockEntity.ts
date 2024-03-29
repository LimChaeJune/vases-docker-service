import { Knex } from "knex";
import { BaseEntity } from "../BaseEntity";

export type StockSchema = {
  idx: number;
  stock_code: string;
  stock_name: string;
  corp_name: string;
  corp_code: string;
  corp_cls: string;
  induty_code: string;
  induty_name: string;
}

export class StockEntity extends BaseEntity<StockSchema>
{
  constructor(tableName: string = "vases_stock") {
    super(tableName, {
      idx: {
        type: "increments",
      },
      stock_name: {
        type:"string",
        comment:"종목명"
      },
      stock_code: {
        type: "string",
        comment:"종목코드"
      },
      corp_code: {
        type: "string",
        unique: true,
        comment: "공시대상회사의 고유번호(8자리)"
      },
      corp_name: {
        type : "string",
        comment: "정식회사명칭"
      },
      induty_code: {
        type: "string",
        comment: "업종코드",
      },
      induty_name: {
        type: "string",
        comment: "업종이름",
      },
      corp_cls: {
        type: 'string',
        comment: '법인구분 : Y(유가), K(코스닥), N(코넥스), E(기타)'
      },
    });
  }
}