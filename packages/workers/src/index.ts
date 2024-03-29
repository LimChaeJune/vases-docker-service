import path from "path";
import workerpool from "workerpool";
import finance from "./finance.worker";

// io 작업을 하므로 process 기반으로 동작
export const pool = workerpool.pool({
  workerType: "process",
});

export const getCorpCode = async () => {
  return await pool.exec(finance.getCorpCode, []);
};

export const getCorpInfo = async (corp_code: string) => {
  return await pool.exec(finance.getCorpInfo, [corp_code]);
};
