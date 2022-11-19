import { Tool } from "../../../models/toolModel";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export const createToolController: Controller = async (
  req: HttpRequest
): Promise<HttpResponse> => {
  if (!req.body.name) {
    return {
      status: 400,
      data: {
        message: "Cannot create a tool without name",
      },
    };
  }
  const createdTool = await Tool.query().insertAndFetch(req.body);
  return {
    status: 201,
    data: createdTool,
  };
};
