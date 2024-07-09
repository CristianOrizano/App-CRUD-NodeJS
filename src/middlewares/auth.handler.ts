import { NextFunction, Request, Response } from "express"
import  jwt  from "jsonwebtoken"
import { ERROR_AUTH } from "../helpers/constantes"

import { UsuarioResponse } from "../models/usuario.interface"


//Middleware de JWT para ver si estamos autenticados
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

interface RequestWithUserRole extends Request {
    user?: UsuarioResponse,
}

export const authenticateToken = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'Token Requerido' })
    }
    jwt.verify(token, JWT_SECRET, (err,decoded) => {
   
        if (err) {
            console.error('Error en la autenticación: ', err)
            return res.status(403).json({ error: ERROR_AUTH })
        }
        req.user = decoded as UsuarioResponse;
        next();
    })
}