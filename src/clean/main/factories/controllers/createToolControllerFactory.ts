import { CreateToolController } from "../../../http/controllers/createToolController";
import { makeCreateToolUsecase } from "../usecases/createToolUsecaseFactory";

export const makeCreateToolController = () => {
  const createToolUsecase = makeCreateToolUsecase();
  const createToolController = new CreateToolController(createToolUsecase);
  return createToolController;
};
