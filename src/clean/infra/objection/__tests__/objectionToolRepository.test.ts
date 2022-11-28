import { Tool } from "../../../../models/toolModel";
import { ObjectionToolRepository } from "../objectionToolRepository";
import "../../../../database";

describe("Objection Tool Repository", () => {
  test("Should create tool correctly", async () => {
    const repo = new ObjectionToolRepository();
    const result = await repo.createTool({
      name: "My tool",
    });
    const createdTool = await Tool.query().findById(result.id);
    expect(createdTool).toEqual(result);
  });
});
