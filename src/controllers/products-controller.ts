import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import zod from "zod";
import { AppError } from "@/utils/AppError";

class ProductsController {
  //lidando com assincronismo por se lidar com banco de dados

  async index(request: Request, response: Response, next: NextFunction) {
    //bloco de trycatch para lidar com exceções

    try {
      //lançando exceção para verificar instancia de AppError sendo gerada propositalmente
      // throw new AppError("ERRO LANÇADO DE TESTE")

      // ------------------

      //  selecionando dados da tabela com KNEX
      const { name } = request.query; // recuperando QUERYPARAMS

      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`) // filtro com o operador LIKE do SQL e o uso do operador NULLISH para filtrar name se existir, se não, recupera tudo
        .orderBy("name"); // ordenando por NAME

      response.json(products);
    } catch (error) {
      //next para que seja possível o próprio express entender que se der erro ir para a próxima função capturar o erro
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      // utilizando o ZOD para fazer a validacao dos dados
      const bodySchema = zod.object({
        name: zod.string({ required_error: "Name is required!" }).trim().min(6),
        price: zod.number().gt(0, { message: "value must be greather than 0" }),
      });

      const { name, price } = bodySchema.parse(request.body);

      // inserindo no banco de dados com KNEX
      await knex<ProductRepository>("products").insert({ name, price });

      response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      // validando com ZOD se o id passado é do tipo NUMBER
      const id = zod
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), "id must be a number")
        .parse(request.params.id);

      // utilizando o ZOD para fazer a validacao dos dados
      const bodySchema = zod.object({
        name: zod.string({ required_error: "Name is required!" }).trim().min(6),
        price: zod.number().gt(0, { message: "value must be greather than 0" }),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      // validando com ZOD se o id passado é do tipo NUMBER
      const id = zod
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), "id must be a number")
        .parse(request.params.id);

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      await knex<ProductRepository>("products").delete().where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
