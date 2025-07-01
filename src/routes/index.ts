import { Router } from "express";
import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./tables-routes";

const routes = Router();

//rotas de products
routes.use("/products", productsRoutes);

// rotas de tables
routes.use("/tables", tablesRoutes);

export { routes };
