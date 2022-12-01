import { ObjectionToolRepository } from "../../../infra/objection/objectionToolRepository";

export const makeToolRepository = () => {
  const toolRepository = new ObjectionToolRepository();
  return toolRepository;
};
