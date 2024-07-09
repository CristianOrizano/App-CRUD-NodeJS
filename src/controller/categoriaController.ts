import { Request, Response } from "express";
import prisma from "../models/usuario";
import { ERROR_SERVER } from "../helpers/constantes";
import { CategoriaRequest } from "../models/categoria.interface";

export const getAllCategorias = async (req: Request, res: Response): Promise<void> => {
    try {
        const categorias  = await prisma.categoria.findMany();
        res.status(200).json(categorias);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: ERROR_SERVER })
    }
}

export const createCategoria = async (req: Request<{},{},CategoriaRequest>, res: Response): Promise<void> => {
    try {
       
        const categoria = await prisma.categoria.create(
            {
                data: req.body
            }
        )
        res.status(201).json(categoria)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error:ERROR_SERVER })
    }
}

export const getCategoriaById = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const categoria = await prisma.categoria.findUnique({
            where: {
                id: Id
            }
        })
        if (!categoria) {
            res.status(404).json({ error: 'El categoria no fue encontrado' })
            return
        }
        res.status(200).json(categoria)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: ERROR_SERVER })
    }
}


export const updateCategoria = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const categoria = await prisma.categoria.update({
            where: {
                id: Id
            },
            data:req.body
        })

        res.status(200).json(categoria)
    } catch (error: any) {
            console.log(error)
            res.status(500).json({ error: ERROR_SERVER })
    }
}

export const deleteCategoria = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const categoria = await prisma.categoria.findUnique({
            where: {
                id: Id
            }
        })
        if (!categoria) {
            res.status(404).json({ error: ERROR_SERVER })
            return
        }

       const deleteCategoria = await prisma.categoria.delete({
            where: {
                id: Id
            }
        })
        res.status(200).json(deleteCategoria)

    } catch (error: any) {
         console.log(error)
        res.status(500).json({ error: ERROR_SERVER })
    }
}


export const insertTwoCategoria = async (req: Request, res: Response): Promise<void> => {
    const { nombre,descripcion,productos} = req.body
    try {
        const categoria = await prisma.categoria.create(
            {
                data:{
                     nombre,
                     descripcion,
                     productos: {
                        create: productos, // Crear los productos como parte de la categoría
                    },
                } 
            }
        )
        res.status(201).json(categoria)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error:ERROR_SERVER })
    }
}