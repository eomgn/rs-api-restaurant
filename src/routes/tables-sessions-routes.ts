import { Router } from "express";
import { TablesSessionsController } from "@/controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router();

// controller
const tablesSessionsController = new TablesSessionsController();

//rotas
tablesSessionsRoutes.post("/", tablesSessionsController.create);

export { tablesSessionsRoutes };
