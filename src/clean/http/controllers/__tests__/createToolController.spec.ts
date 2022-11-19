import { CreateToolRepository } from "../../../domain/repositories/toolRepository";
import { badRequest } from "../../protocols";
import { makeCreateToolController } from "../createToolController";

const makeController = () => {
  const mockedCreateToolRepo: CreateToolRepository = jest.fn(async (_) => ({
    id: 1,
    name: "",
    tags: [],
  }));
  return {
    controller: makeCreateToolController(mockedCreateToolRepo),
    createToolRepo: mockedCreateToolRepo,
  };
};

describe("Create Tool Controller", () => {
  test("Should return bad request if there is no name", async () => {
    const { controller } = makeController();
    const result = await controller({
      body: {
        name: "",
      },
    });
    expect(result).toEqual(
      badRequest({
        message: "Cannot create a tool without name",
      })
    );
  });

  test("Should call createToolRepo with correct params - without tags", async () => {
    const { controller, createToolRepo } = makeController();
    await controller({
      body: {
        name: "Any name",
      },
    });
    expect(createToolRepo).toHaveBeenCalledWith({
      name: "Any name",
    });
  });

  test("Should call createToolRepo with correct params", async () => {
    const { controller, createToolRepo } = makeController();
    await controller({
      body: {
        name: "Any name",
        tags: ["tag1"],
      },
    });
    expect(createToolRepo).toHaveBeenCalledWith({
      name: "Any name",
      tags: ["tag1"],
    });
  });

  test("Should call createToolRepo with correct params - duplicated tag", async () => {
    const { controller, createToolRepo } = makeController();
    await controller({
      body: {
        name: "Any name",
        tags: ["tag1", "tag2", "tag2"],
      },
    });
    expect(createToolRepo).toHaveBeenCalledWith({
      name: "Any name",
      tags: ["tag1", "tag2"],
    });
  });

  test("Should return 201", async () => {
    const { controller } = makeController();
    const result = await controller({
      body: {
        name: "Any name",
      },
    });
    expect(result.status).toBe(201);
  });
});
