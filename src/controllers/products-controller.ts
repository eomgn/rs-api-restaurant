import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

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
}

export { ProductsController };
