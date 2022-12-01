import { json, Router } from "express";
import { adaptExpressRoute } from "../clean/infra/express/expressAdapters";
import { Tool } from "../models/toolModel";
import { makeCreateToolController } from "../clean/main/factories/controllers/createToolControllerFactory";

export const toolsRouter = Router();

const createToolController = makeCreateToolController();

toolsRouter.post("/tool", json(), adaptExpressRoute(createToolController));

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
