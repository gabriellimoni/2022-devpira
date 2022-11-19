import server from "./server";
import Knex from "knex";
import { Model } from "objection";
import { databaseConnectionString } from "./env";

const knex = Knex({
  client: "pg",
  connection: databaseConnectionString,
  searchPath: ["knex", "public"],
});
Model.knex(knex);

server.listen(3000, () => {
  console.log("Running on port 3000");
});
