import { CreateToolUsecase } from "../../domain/usecases/createToolUsecase";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class CreateToolController implements Controller {
  constructor(private readonly createToolUsecase: CreateToolUsecase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    if (!req.body?.name) {
      return {
        status: 400,
        data: {
          message: "Cannot create a tool without name",
        },
      };
    }
    const tool = await this.createToolUsecase.perform(req.body);
    return {
      status: 201,
      data: tool,
    };
  }
}
