import { CreateToolController } from "../../../http/controllers/createToolController";

export const makeCreateToolController = () => {
  const createToolController = new CreateToolController();
  return createToolController;
};
