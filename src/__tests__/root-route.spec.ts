import request from "supertest";
import server from "../server";

describe("Root route", () => {
  test("Root route get", async () => {
    const result = await request(server).get("/");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      data: "Hello world",
    });
  });
});
