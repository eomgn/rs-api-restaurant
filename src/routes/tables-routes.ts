import { Router } from "express";
import { TablesController } from "@/controllers/tables-controller";

const tablesRoutes = Router();

// controller
const tablesController = new TablesController();

tablesRoutes.get("/", tablesController.index);

export { tablesRoutes };
