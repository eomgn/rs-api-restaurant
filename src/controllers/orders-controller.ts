import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import zod from "zod";
import { AppError } from "@/utils/AppError";

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = zod.object({
        table_session_id: zod.number(),
        product_id: zod.number(),
        quantity: zod.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body
      );

      // selecionando a sessão que seja igual ao table_session_id passado
      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .select()
        .where({ id: table_session_id })
        .first();

      // verificando se a sessão existe
      if (!session) {
        throw new AppError("session table is not found");
      }

      // verificando se a sessão está fechada
      if (session.closed_at) {
        throw new AppError("this table is closed");
      }

      // =======

      // selecionando o produto que seja igual ao product_id passado
      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id: product_id })
        .first();

      // verificando se o produto existe
      if (!product) {
        throw new AppError("product not found");
      }

      // =======

      // adicionando pedidos no banco de dados
      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params;

      const order = await knex("orders")
        .select(
          "orders.id",
          "orders.table_session_id",
          "orders.product_id",
          "products.name",
          "orders.price",
          "orders.quantity"
        )
        .join("products", "products.id", "orders.product_id")
        .where({ table_session_id });

      return response.json(order);
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
