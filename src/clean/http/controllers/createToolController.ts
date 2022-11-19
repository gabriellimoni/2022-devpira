import { Tool } from "../../../models/toolModel";
import {
  badRequest,
  Controller,
  created,
  HttpRequest,
  HttpResponse,
} from "../protocols";

export const createToolController: Controller = async (
  req: HttpRequest
): Promise<HttpResponse> => {
  if (!req.body.name) {
    return badRequest({
      message: "Cannot create a tool without name",
    });
  }
  const createdTool = await Tool.query().insertAndFetch(req.body);
  return created(createdTool);
};
