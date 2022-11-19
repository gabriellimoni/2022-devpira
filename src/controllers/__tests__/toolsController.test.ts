import request from "supertest";
import { Tool } from "../../models/toolModel";
import server from "../../server";

describe("Tools controller", () => {
  beforeAll(async () => {
    await Tool.query().delete();
  });
  afterAll(async () => {
    await Tool.query().delete();
  });
  describe("POST /tool", () => {
    test("Should create tool correctly", async () => {
      const result = await request(server)
        .post("/tool")
        .send({
          name: "Any tool",
          tags: ["my-tag"],
        });
      expect(result.status).toBe(201);
      expect(result.body.id).not.toBeNull();

      const createdTool = await Tool.query().findById(result.body.id);
      expect(createdTool).toEqual(result.body);
    });
    test("Should not create a tool without name", async () => {
      const result = await request(server)
        .post("/tool")
        .send({
          name: "",
          tags: ["my-tag"],
        });
      expect(result.status).toBe(400);
      expect(result.body.message).toBe("Cannot create a tool without name");
    });
  });
});
