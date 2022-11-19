import express from "express";
import { routerV1 } from "./routes";

const server = express();

server.get("/", (_, res) => {
  res.send({
    data: "Hello world",
  });
});

server.use(routerV1);

export default server;
