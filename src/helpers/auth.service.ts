
// estas importando el modulo completo jsonwebtoken bajo el nombre jwt.
// Esto significa que jwt se convierte en un alias para todo el modulo jsonwebtoken, y puedes acceder a todas las exportaciones que tenga.
import jwt  from "jsonwebtoken"
// import { sign } from "jsonwebtoken";  
import dotenv from 'dotenv';
import { Role, Usuario } from "@prisma/client";

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

export const generateToken = (usuario: Usuario& { role: Role | null }): string => {
    console.log("====>",JWT_SECRET)
    return jwt.sign({ id: usuario.id, email: usuario.email,role: usuario.role?.nombre }, JWT_SECRET, { expiresIn: '1h' })
}