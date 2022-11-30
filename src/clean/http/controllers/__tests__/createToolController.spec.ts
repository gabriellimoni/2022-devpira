import { Tool } from "../../../domain/entities/Tool";
import { CreateToolUsecase } from "../../../domain/usecases/createToolUsecase";
import { CreateToolController } from "../createToolController";

class MockedCreateToolUsecase implements CreateToolUsecase {
  async perform(input: Omit<Tool, "id">): Promise<Tool> {
    return {
      id: 1,
      name: "Any tag",
      tags: ["tag1"],
    };
  }
}

describe("Create tool controller", () => {
  test("Should call createToolUsecase with correct params", async () => {
    const createToolUsecase = new MockedCreateToolUsecase();
    const controller = new CreateToolController(createToolUsecase);

    const createToolUsecaseSpy = jest.spyOn(createToolUsecase, "perform");

    await controller.handle({
      body: {
        name: "Craete this tool",
        tags: ["tag1", "tag2"],
      },
    });

    expect(createToolUsecaseSpy).toHaveBeenCalledWith({
      name: "Craete this tool",
      tags: ["tag1", "tag2"],
    });
  });
  test("Should return 201 on success", async () => {
    const createToolUsecase = new MockedCreateToolUsecase();
    const controller = new CreateToolController(createToolUsecase);

    const result = await controller.handle({
      body: {
        name: "Craete this tool",
        tags: ["tag1", "tag2"],
      },
    });

    expect(result.status).toBe(201);
  });
  test("Should return 400 if no tool name", async () => {
    const createToolUsecase = new MockedCreateToolUsecase();
    const controller = new CreateToolController(createToolUsecase);

    const result = await controller.handle({
      body: {
        name: "",
        tags: ["tag1", "tag2"],
      },
    });

    expect(result.status).toBe(400);
  });
});
