import path from "path";
import workerpool from "workerpool";
import finance from "./finance.worker";

export const pool = workerpool.pool();

export const getCorpCode = async () => {
  return await pool.exec(finance.getCorpCode, []);
};

export const getCorpInfo = async (corp_code: string) => {
  return await pool.exec(finance.getCorpInfo, [corp_code]);
};
