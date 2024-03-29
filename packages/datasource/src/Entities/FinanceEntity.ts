import { Knex } from "knex";
import { BaseEntity } from "../BaseEntity";

export type FinanceSchema = {
  idx: number;
  corp_code: string;
  distb_stock_co: string;
  유동자산: string;
  비유동자산: string;
  자산총계: string;
  유동부채: string;
  비유동부채: string;
  부채총계: string;
  자본금: string;
  이익잉여금: string;
  자본총계: string;
  매출액: string;
  영업이익: string;
  법인세차감전_순이익: string;
  당기순이익: string;
  date: number;
};

export class FinanceEntity extends BaseEntity<
FinanceSchema
> {
  constructor(tableName: string = "vases_finance") {
    super(tableName, {
      idx: {
        type: "increments",
      },
      corp_code: {
        type: "string",
        unique: true,
        comment: "공시대상회사의 고유번호(8자리)"
      },
      date: {
        type: "integer",
        comment:"공시 기준 분기 (예: 201803, 201806, 201809, 201812)",
        unique: true,
      },
      유동자산: {
        type: "string",
      },
      비유동자산: {
        type: "string",
      },
      자산총계: {
        type: "string",
      },
      유동부채: {
        type: "string",
      },
      비유동부채: {
        type: "string",
      },
      부채총계: {
        type: "string",
      },
      자본금: {
        type: "string",
      },
      이익잉여금: {
        type: "string",
      },
      자본총계: {
        type: "string",
      },
      매출액: {
        type: "string",
      },
      영업이익: {
        type: "string",
      },
      법인세차감전_순이익: {
        type: "string",
      },
      당기순이익: {
        type: "string",
      },
      distb_stock_co: {
        type: "string",
        comment:"유통주식수"
      },
    });
  }
}
