import { Router } from "express";
import { OrdersController } from "@/controllers/orders-controller";

const ordersRoutes = Router();

// controller
const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);

export { ordersRoutes };
