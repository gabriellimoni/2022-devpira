import { Tool as ToolModel } from "../../../models/toolModel";
import { Tool } from "../../domain/entities/tool";
import { CreateToolRepository } from "../../domain/repositories/toolRepository";

export class ObjectionToolRepository implements CreateToolRepository {
  async create(tool: Omit<Tool, "id">): Promise<Tool> {
    const createdTool = await ToolModel.query().insertAndFetch(tool);
    return {
      id: createdTool.id,
      name: createdTool.name,
      tags: createdTool.tags as string[],
    };
  }
}
