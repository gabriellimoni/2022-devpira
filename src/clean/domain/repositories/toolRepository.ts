import { Tool } from "../entities/tool";

export interface CreateToolRepository {
  (params: Omit<Tool, "id">): Promise<Tool>;
}
