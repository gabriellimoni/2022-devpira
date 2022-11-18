import express from "express";

const server = express();

server.get("/", (_, res) => {
  res.send({
    data: "Hello world",
  });
});

export default server;
