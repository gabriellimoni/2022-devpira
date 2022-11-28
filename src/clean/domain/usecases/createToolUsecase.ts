import { Tool } from "../entities/Tool";
import { CreateToolRepository } from "../repositories/toolRepository";

export interface CreateToolUsecase {
  perform: (input: Omit<Tool, "id">) => Promise<Tool>;
}

export class CreateToolImplementation implements CreateToolUsecase {
  constructor(private readonly createToolRepo: CreateToolRepository) {}

  async perform(input: Omit<Tool, "id">): Promise<Tool> {
    const tags = input.tags || [];
    const uniqueTags = Array.from(new Set(tags));
    const createdTool = await this.createToolRepo.createTool({
      ...input,
      tags: uniqueTags,
    });
    return createdTool;
  }
}
