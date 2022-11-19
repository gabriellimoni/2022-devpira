import { json, Router } from "express";
import { createToolController } from "../clean/http/controllers/createToolController";
import { Tool } from "../models/toolModel";

export const toolsRouter = Router();

toolsRouter.post("/tool", json(), async (req, res) => {
  const result = await createToolController(req);
  return res.status(result.status).send(result.data);
});

toolsRouter.get("/tool", async (req, res) => {
  const result = await Tool.query();
  return res.status(200).send(result);
});

toolsRouter.get("/tool/:id", async (req, res) => {
  const result = await Tool.query().findById(req.params.id);
  return res.status(200).send(result);
});

toolsRouter.patch("/tool/:id", json(), async (req, res) => {
  const result = await Tool.query().patchAndFetchById(req.params.id, req.body);
  return res.status(200).send(result);
});

toolsRouter.delete("/tool/:id", async (req, res) => {
  await Tool.query().deleteById(req.params.id);
  return res.status(204).send();
});
