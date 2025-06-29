import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

//middleware criado para lidar com exceções
export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  //verifica se o erro é uma instancia de APPERROR
  if (error instanceof AppError) {
    // a grande sacada é identificar se o erro foi lançado propositalmente
    return response.status(error.statusCode).json({ message: error.message });
  }

  // -----------------------------

  //verifica se o erro é uma instancia de ZODERROR
  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: "validation error", issues: error.format() });
  }

  // caso nao seja um erro proposital é lançado um erro especifico
  return response.status(500).json({ message: error.message });
}
