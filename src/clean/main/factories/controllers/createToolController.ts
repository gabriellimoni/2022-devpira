import { makeCreateToolController } from "../../../http/controllers/createToolController";
import { objectionCreateToolRepo } from "../../../infra/objection/tool";

export const createToolController = makeCreateToolController(
  objectionCreateToolRepo
);
