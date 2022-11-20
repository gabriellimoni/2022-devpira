import { Tool } from "../entities/tool";

export interface CreateToolRepository {
  create(tool: Omit<Tool, "id">): Promise<Tool>;
}
