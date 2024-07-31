import { comparePasswords, hashPassword } from "../helpers/password.service";
import { generateToken } from "../helpers/auth.service";
import { Request, Response } from "express";
import prisma from "../models/usuario";
import { UsuarioLogin, UsuarioRequest } from "../models/usuario.interface";

import moment from "moment-timezone";

const EXPIRA = process.env.EXPIRA || '30'

export const register = async (req: Request<{}, {}, UsuarioRequest>,res: Response): Promise<void> => {
  const { nombre, apellido, email, password } = req.body;
  try {
    const find = await prisma.usuario.findUnique({
      where:{
        email
      }
    })
    if (find) {
       res.status(401).json({ error: "Email ya existe Existe" });
       return
    }
    const hashedPassword = await hashPassword(password);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        idRole:1,
        estado:true
      },
    });
    res.status(201).json(usuario);
  } catch (error: any) {
   /* if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({ message: "El mail ingresado ya existe" });
    }*/

    console.log(error);
    res.status(500).json({ error: "Hubo un error en el registro" });
  }
};

export const login = async (req: Request<{}, {}, UsuarioLogin>, res: Response) => {
  const { email, password } = req.body;
  try {
    const usuario = await prisma.usuario.findUnique({ 
        where: { email },
        include: { role: true } 
      });
    if (!usuario) {
      return res.status(401).json({ error: "Usuario no Existe" });
    }

    const isValid = await comparePasswords(password, usuario.password as string);
    if (!isValid) {
      return res.status(401).json({ error: "Contraseña es incorrecta" });
    }
    const expiresIn = parseInt(EXPIRA);
    console.log("HORA", expiresIn)
    //const expirationDate = new Date(Date.now() + expiresIn * 1000); // Fecha de expiración en milisegundos
    const expirationDate = moment().add(expiresIn, 'seconds').tz('America/Lima').format('DD-MM-YYYY HH:mm:ss');

    const auth ={
     token:generateToken(usuario),
     usuario: usuario,
     expiresAt: expirationDate // Fecha de expiración en la zona horaria de Lima
    // expiresAt: expirationDate.toISOString() 
    } 
    res.status(200).json( auth );
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
