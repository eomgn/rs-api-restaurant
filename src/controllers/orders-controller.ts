import { Request, Response, NextFunction } from "express";
import zod from "zod";

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

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
