import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import zod from "zod";

class TablesSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = zod.object({
        table_id: zod.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      //selecionando a ultima sessão de acordo com o table_id passado
      const sessions = await knex<TablesSessionsRepository>("tables_sessions")
        .select()
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      // verificando se a sessão não já existe e se o closed_at ainda não está preenchido que significa que a mesa ainda esta aberta
      if (sessions && !sessions.closed_at) {
        throw new AppError("this table is already open");
        //caso for true irá então lançar uma excessão indicando que a mesa ainda está aberta
      }

      // criando sessao
      await knex<TablesSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knex<TablesSessionsRepository>("tables_sessions")
        .select()
        .orderBy("closed_at");

      return response.json(sessions);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = zod
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .select()
        .where({ id })
        .first();

      // verificando se a session existe
      if (!session) {
        throw new AppError("Session table not found");
      }

      // verificando se o 'closed_at' num ja esta é fechado
      if (session.closed_at) {
        throw new AppError("This session table is already closed");
      }

      // fechando a mesa atualizando entao o 'closed_at'
      await knex<TablesSessionsRepository>("tables_sessions")
        .update({
          closed_at: knex.fn.now(),
        })
        .where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };
