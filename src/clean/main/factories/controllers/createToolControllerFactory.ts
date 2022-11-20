import { CreateToolController } from "../../../http/controllers/createToolController";
import { ObjectionToolRepository } from "../../../infra/objection/objectionToolRepository";

export const makeCreateToolController = () => {
  const toolRepository = new ObjectionToolRepository();
  const createToolController = new CreateToolController(toolRepository);
  return createToolController;
};
