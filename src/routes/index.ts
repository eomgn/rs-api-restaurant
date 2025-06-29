import { Router } from "express";
import { productsRoutes } from "./products-routes";

const routes = Router();

//rotas de products
routes.use("/products", productsRoutes);

export { routes };
