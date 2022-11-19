import { Tool as ToolModel } from "../../../models/toolModel";
import { Tool } from "../../domain/entities/tool";
import { CreateToolRepository } from "../../domain/repositories/toolRepository";

export const objectionCreateToolRepo: CreateToolRepository = async (input) => {
  const createdTool = await ToolModel.query().insertAndFetch(input);
  return createdTool as Tool;
};
