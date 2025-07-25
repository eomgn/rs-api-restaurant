import { Router } from "express";
import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./tables-routes";
import { tablesSessionsRoutes } from "./tables-sessions-routes";
import { ordersRoutes } from "./orders-routes";

const routes = Router();

//rotas de products
routes.use("/products", productsRoutes);

// rotas de tables
routes.use("/tables", tablesRoutes);

// rotas de tables_sessions
routes.use("/tables-sessions", tablesSessionsRoutes);

// rotas de orders
routes.use("/orders", ordersRoutes);

export { routes };
