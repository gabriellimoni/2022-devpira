import request from "supertest";
import { Tool } from "../../models/toolModel";
import server from "../../server";

describe("Tools endpoints", () => {
  beforeEach(async () => {
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
  describe("GET /tool", () => {
    test("Should fetch tools correctly", async () => {
      await Tool.query().insert({
        name: "Any tool",
        tags: ["my-tag"],
      });
      const result = await request(server).get("/tool");
      expect(result.status).toBe(200);
      expect(result.body).toHaveLength(1);
      expect(result.body[0]).toEqual({
        id: expect.any(Number),
        name: "Any tool",
        tags: ["my-tag"],
      });
    });
  });
  describe("GET /tool/:id", () => {
    test("Should fetch tool correctly", async () => {
      const createdTool = await Tool.query().insertAndFetch({
        name: "Any tool",
        tags: ["my-tag"],
      });
      const result = await request(server).get(`/tool/${createdTool.id}`);
      expect(result.status).toBe(200);
      expect(result.body).not.toBeNull();
      expect(result.body).toEqual(createdTool);
    });
  });
  describe("PATCH /tool/:id", () => {
    test("Should patch tool correctly", async () => {
      const createdTool = await Tool.query().insertAndFetch({
        name: "Any tool",
        tags: ["my-tag"],
      });
      const result = await request(server)
        .patch(`/tool/${createdTool.id}`)
        .send({
          name: "New name",
        });
      expect(result.status).toBe(200);
      expect(result.body).not.toBeNull();
      expect(result.body).toEqual({
        ...createdTool,
        name: "New name",
      });
    });
  });
  describe("DELETE /tool/:id", () => {
    test("Should delete tool correctly", async () => {
      const createdTool = await Tool.query().insertAndFetch({
        name: "Any tool",
        tags: ["my-tag"],
      });
      const result = await request(server).delete(`/tool/${createdTool.id}`);
      expect(result.status).toBe(204);

      const deletedTool = await Tool.query().findById(createdTool.id);
      expect(deletedTool).toBeUndefined();
    });
  });
});
