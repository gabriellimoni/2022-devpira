import { Router } from "express";
import { toolsRouter } from "./controllers/toolsController";

export const routerV1 = Router();

routerV1.use(toolsRouter);
