import { CreateToolImplementation } from "../../../domain/usecases/createToolUsecase";
import { makeToolRepository } from "../repositories/toolRepositoryFactory";

export const makeCreateToolUsecase = () => {
  const toolRepository = makeToolRepository();
  const createToolUsecase = new CreateToolImplementation(toolRepository);
  return createToolUsecase;
};
