import { CreateToolRepository } from "../../domain/repositories/toolRepository";
import {
  badRequest,
  Controller,
  created,
  HttpRequest,
  HttpResponse,
} from "../protocols";

export const makeCreateToolController: (
  createToolRepo: CreateToolRepository
) => Controller =
  (createToolRepo: CreateToolRepository) =>
  async (req: HttpRequest): Promise<HttpResponse> => {
    if (!req.body.name) {
      return badRequest({
        message: "Cannot create a tool without name",
      });
    }
    if (req.body.tags?.length) {
      req.body.tags = Array.from(new Set(req.body.tags));
    }
    const createdTool = await createToolRepo(req.body);
    return created(createdTool);
  };
