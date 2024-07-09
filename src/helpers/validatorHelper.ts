import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/*Si hay errores de validación, el middleware ValidationErrors captura esos errores y envía una respuesta con el estado 400 
y los detalles de los errores. Si no hay errores, next() llama al siguiente middleware o controlador. */
export const ValidationErrors = (req: Request,res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};