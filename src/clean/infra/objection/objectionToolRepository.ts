import { Tool as ToolModel } from "../../../models/toolModel";
import { Tool } from "../../domain/entities/Tool";
import { CreateToolRepository } from "../../domain/repositories/toolRepository";

export class ObjectionToolRepository implements CreateToolRepository {
  async createTool(tool: Omit<Tool, "id">): Promise<Tool> {
    const createdTool = await ToolModel.query().insertAndFetch(tool);
    return createdTool as Tool;
  }
}
