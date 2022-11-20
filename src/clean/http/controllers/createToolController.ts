import { CreateToolRepository } from "../../domain/repositories/toolRepository";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class CreateToolController implements Controller {
  constructor(private readonly createToolRepo: CreateToolRepository) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    if (!req.body.name) {
      return {
        status: 400,
        data: {
          message: "Cannot create a tool without name",
        },
      };
    }
    const createdTool = await this.createToolRepo.create(req.body);
    return {
      status: 201,
      data: createdTool,
    };
  }
}
