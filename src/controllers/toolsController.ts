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
