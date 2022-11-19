import { json, Router } from "express";
import { Tool } from "../models/toolModel";

export const toolsRouter = Router();

toolsRouter.post("/tool", json(), async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Cannot create a tool without name",
    });
  }
  const createdTool = await Tool.query().insertAndFetch(req.body);
  return res.status(201).send(createdTool);
});
