import Knex from "knex";
import { Model } from "objection";
import { databaseConnectionString } from "./env";

const knex = Knex({
  client: "pg",
  connection: databaseConnectionString,
  searchPath: ["knex", "public"],
});
Model.knex(knex);
