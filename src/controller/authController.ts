import { comparePasswords, hashPassword } from "../helpers/password.service";
import { generateToken } from "../helpers/auth.service";
import { Request, Response } from "express";
import prisma from "../models/usuario";
import { UsuarioLogin, UsuarioRequest } from "../models/usuario.interface";
import JsonWebTokenError  from "jsonwebtoken";

export const register = async (req: Request<{}, {}, UsuarioRequest>,res: Response): Promise<void> => {
  const { nombre, apellido, email, password } = req.body;
  try {
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
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({ message: "El mail ingresado ya existe" });
    }

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

    const token = generateToken(usuario);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
