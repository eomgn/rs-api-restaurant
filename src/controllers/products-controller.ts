import { Request, Response, NextFunction } from "express";

import zod from "zod";

class ProductsController {
  //lidando com assincronismo por se lidar com banco de dados

  async index(request: Request, response: Response, next: NextFunction) {
    //bloco de trycatch para lidar com exceções

    try {
      //lançando exceção para verificar instancia de AppError sendo gerada propositalmente
      // throw new AppError("ERRO LANÇADO DE TESTE")

      response.json({ message: "ok" });
    } catch (error) {
      //next para que seja possível o próprio express entender que se der erro ir para a próxima função capturar o erro

      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = zod.object({
        name: zod.string({ required_error: "Name is required!" }).trim().min(6),
        price: zod.number().gt(0, { message: "value must be greather than 0" }),
      });

      const { name, price } = bodySchema.parse(request.body);

      response.status(201).json({ name, price });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
