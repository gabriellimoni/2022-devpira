import { json, Router } from "express";
import { Tool } from "../models/toolModel";

export const toolsRouter = Router();

toolsRouter.post("/tool", json(), async (req, res) => {
  const createdTool = await Tool.query().insertAndFetch(req.body);
  res.send(createdTool);
});
