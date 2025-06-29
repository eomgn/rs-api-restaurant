import { Router } from "express";
import { ProductsController } from "@/controllers/products-controller";

const productsRoutes = Router();

// controller
const productsController = new ProductsController();

//rotas de products
productsRoutes.get("/", productsController.index);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);

export { productsRoutes };
