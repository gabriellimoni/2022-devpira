import { Request, Response } from "express";
import { Controller } from "../../http/protocols";

export const adaptExpressRoute =
  (controller: Controller) => async (req: Request, res: Response) => {
    try {
      const result = await controller.handle(req);
      return res.status(result.status).send(result.data);
    } catch (error) {
      // log
      return res.status(500).send("Internal server error");
    }
  };
