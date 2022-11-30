import { Tool } from "../entities/Tool";
import { CreateToolRepository } from "../repositories/toolRepository";

export interface CreateToolUsecase {
  perform: (input: Omit<Tool, "id">) => Promise<Tool>;
}

export class CreateToolImplementation implements CreateToolUsecase {
  constructor(private readonly createToolRepo: CreateToolRepository) {}

  async perform(input: Omit<Tool, "id">): Promise<Tool> {
    const createdTool = await this.createToolRepo.createTool(input);
    return createdTool;
  }
}
