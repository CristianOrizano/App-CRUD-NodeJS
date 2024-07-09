import { Request, Response } from "express";
import prisma from "../models/usuario";
import { ERROR_SERVER } from "../helpers/constantes";
import { ProductoRequest, ProductoResponse } from "../models/producto.interface";


export const getAllProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const productos  = await prisma.producto.findMany({
            include:{
                categoria:true
            }
        });
        res.status(200).json(productos);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: ERROR_SERVER })
    }
}

export const createProducto = async (req: Request<{},{},ProductoRequest>, res: Response): Promise<void> => {
    try {
       // const { nombre,descripcion,precio,stock,idCategoria } = req.body
        const producto = await prisma.producto.create(
            {
                data: {
                  ...req.body,
                  estado:true
                }
            }
        )
        res.status(201).json(producto)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error:ERROR_SERVER })
    }
}

export const getProductoById = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const producto = await prisma.producto.findUnique({
            where: {
                id: Id
            }
        })
        if (!producto) {
            res.status(404).json({ error: 'El Producto no fue encontrado' })
            return
        }
        res.status(200).json(producto)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: ERROR_SERVER })
    }
}


export const updateProdcuto = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    const { nombre,descripcion,precio,stock,idCategoria } = req.body
    try {

        const producto = await prisma.producto.update({
            where: {
                id: Id
            },
            data: {
               nombre,
               descripcion,
               precio,
               stock,
               idCategoria,
               estado:true
             }
        })

        res.status(200).json(producto)
    } catch (error: any) {
            console.log(error)
            res.status(500).json({ error: ERROR_SERVER })
    }
}

export const deleteProducto = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const producto = await prisma.producto.findUnique({
            where: {
                id: Id
            }
        })
        if (!producto) {
            res.status(404).json({ error: 'El producto no fue encontrado' })
            return
        }

       const deleteProducto = await prisma.producto.delete({
            where: {
                id: Id
            }
        })
        res.status(200).json(deleteProducto).end()

    } catch (error: any) {
         console.log(error)
        res.status(500).json({ error: ERROR_SERVER })
    }
}