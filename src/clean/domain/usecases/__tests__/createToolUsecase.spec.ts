import { Tool } from "../../entities/Tool";
import { CreateToolRepository } from "../../repositories/toolRepository";
import { CreateToolImplementation } from "../createToolUsecase";

class MockedToolRepo implements CreateToolRepository {
  async createTool(tool: Omit<Tool, "id">): Promise<Tool> {
    return {
      id: 1,
      name: "Any tool",
      tags: ["tag1"],
    };
  }
}

describe("Create tool usecase", () => {
  test("Should call createToolRepo with correct params", async () => {
    const toolRepo = new MockedToolRepo();
    const createToolUsecase = new CreateToolImplementation(toolRepo);

    const createToolSpy = jest.spyOn(toolRepo, "createTool");

    await createToolUsecase.perform({
      name: "Create this tool",
      tags: ["tag1", "tag2"],
    });

    expect(createToolSpy).toHaveBeenCalledWith({
      name: "Create this tool",
      tags: ["tag1", "tag2"],
    });
  });
  test("Should call createToolRepo with correct params - duplicated tags", async () => {
    const toolRepo = new MockedToolRepo();
    const createToolUsecase = new CreateToolImplementation(toolRepo);

    const createToolSpy = jest.spyOn(toolRepo, "createTool");

    await createToolUsecase.perform({
      name: "Create this tool",
      tags: ["tag1", "tag2", "tag2"],
    });

    expect(createToolSpy).toHaveBeenCalledWith({
      name: "Create this tool",
      tags: ["tag1", "tag2"],
    });
  });
  test("Should return created tool correctly", async () => {
    const toolRepo = new MockedToolRepo();
    const createToolUsecase = new CreateToolImplementation(toolRepo);

    const result = await createToolUsecase.perform({
      name: "Create this tool",
      tags: ["tag1", "tag2"],
    });

    expect(result).toEqual({
      id: 1,
      name: "Any tool",
      tags: ["tag1"],
    });
  });
});
