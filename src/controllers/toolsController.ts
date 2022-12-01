import { json, Router } from "express";
import { CreateToolImplementation } from "../clean/domain/usecases/createToolUsecase";
import { CreateToolController } from "../clean/http/controllers/createToolController";
import { ObjectionToolRepository } from "../clean/infra/objection/objectionToolRepository";
import { adaptExpressRoute } from "../clean/infra/express/expressAdapters";
import { Tool } from "../models/toolModel";

export const toolsRouter = Router();

const toolRepo = new ObjectionToolRepository();
const createToolUsecase = new CreateToolImplementation(toolRepo);
const createToolController = new CreateToolController(createToolUsecase);

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
