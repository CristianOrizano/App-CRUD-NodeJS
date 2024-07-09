import { NextFunction, Request, Response } from "express";
import { UsuarioResponse } from "../models/usuario.interface";


interface RequestWithUserRole extends Request {
    user?: UsuarioResponse,
}

export const roleMiddleware = (requiredRole:string) => (req:RequestWithUserRole, res:Response, next:NextFunction) => {
    if (req.user?.role !== requiredRole) return res.status(403).json({ error: 'Acceso denegado' });
    next();
};
