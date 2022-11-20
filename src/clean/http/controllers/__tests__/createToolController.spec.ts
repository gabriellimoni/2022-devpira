import { Tool } from "../../../domain/entities/tool";
import { CreateToolRepository } from "../../../domain/repositories/toolRepository";
import { CreateToolController } from "../createToolController";

class MockedCreateToolRepo implements CreateToolRepository {
  async create(tool: Omit<Tool, "id">): Promise<Tool> {
    return {
      id: 10,
      ...tool,
    };
  }
}

const makeTestData = () => {
  const createToolRepo = new MockedCreateToolRepo();
  const controller = new CreateToolController(createToolRepo);
  const createToolSpy = jest.spyOn(createToolRepo, "create");

  return {
    controller,
    createToolSpy,
  };
};

describe("Create Tool Controller", () => {
  test("Should returtn 400 if name is not sent", async () => {
    const { controller } = makeTestData();
    const result = await controller.handle({
      body: {
        name: "",
      },
    });
    expect(result).toEqual({
      status: 400,
      data: {
        message: "Cannot create a tool without name",
      },
    });
  });

  test("Should call createToolRepo with correct params - without tags", async () => {
    const { controller, createToolSpy } = makeTestData();
    await controller.handle({
      body: {
        name: "Any name",
      },
    });
    expect(createToolSpy).toHaveBeenCalledWith({
      name: "Any name",
    });
  });

  test("Should call createToolRepo with correct params - with tags", async () => {
    const { controller, createToolSpy } = makeTestData();
    await controller.handle({
      body: {
        name: "Any name",
        tags: ["tag1"],
      },
    });
    expect(createToolSpy).toHaveBeenCalledWith({
      name: "Any name",
      tags: ["tag1"],
    });
  });

  test("Should call createToolRepo with correct params - with duplicated and falsy tags", async () => {
    const { controller, createToolSpy } = makeTestData();
    await controller.handle({
      body: {
        name: "Any name",
        tags: ["tag1", "tag2", "tag2", undefined, null, ""],
      },
    });
    expect(createToolSpy).toHaveBeenCalledWith({
      name: "Any name",
      tags: ["tag1", "tag2"],
    });
  });

  test("Should return 201 and created tool correctly", async () => {
    const { controller } = makeTestData();
    const result = await controller.handle({
      body: {
        name: "Any name",
        tags: ["tag1"],
      },
    });
    expect(result).toEqual({
      status: 201,
      data: {
        name: "Any name",
        tags: ["tag1"],
        id: expect.any(Number),
      },
    });
  });
});
