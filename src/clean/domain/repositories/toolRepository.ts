import { Tool } from "../entities/Tool";

export interface CreateToolRepository {
  createTool: (tool: Omit<Tool, "id">) => Promise<Tool>;
}
