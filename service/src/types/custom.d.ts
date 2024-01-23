import { GlobalConfig } from "@app/configure";
import { Knex } from "knex";


declare global {
  var config: GlobalConfig;
  var knex: Knex;
}

export {};