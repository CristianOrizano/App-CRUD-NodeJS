
import { Request, Response } from "express"
import prisma from "../models/usuario"
import { EmpleadoRequest, EmpleadoResponse } from "../models/empleado.interface"
import { formatToISODate } from "../helpers/dateFormat";
import { ERROR_SERVER } from "../helpers/constantes";


export const getAllEmpleados = async (req: Request, res: Response): Promise<void> => {
    try {
        const empleados  = await prisma.empleado.findMany();
        console.log(empleados)
        res.status(200).json(empleados);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: ERROR_SERVER})
    }
}

export const createEmpleado = async (req: Request<{},{},EmpleadoRequest>, res: Response): Promise<void> => {
    try {
        const { nombre, apellido,sueldo,fechaNacimiento,telefono } = req.body
        const empleado = await prisma.empleado.create(
            {
                data: {
                   nombre,
                   apellido,
                   sueldo,
                   fecha_nacimiento: formatToISODate(fechaNacimiento),
                   telefono
                }
            }
        )
        console.log(empleado)
        res.status(201).json(empleado)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: ERROR_SERVER})
    }
}

export const getEmpleadoById = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const empleado = await prisma.empleado.findUnique({
            where: {
                id: Id
            }
        })
        console.log(empleado);
        if (!empleado) {
            res.status(404).json({ error: 'El Empleado no fue encontrado' })
            return
        }
        res.status(200).json(empleado)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: ERROR_SERVER })
    }
}


export const updateEmpleado = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    const { nombre, apellido,sueldo,fechaNacimiento,telefono } = req.body
    try {

        const empleado = await prisma.empleado.update({
            where: {
                id: Id
            },
            data:{
                nombre,
                apellido,
                sueldo,
                fecha_nacimiento: formatToISODate(fechaNacimiento),
                telefono
            }
        })

        res.status(200).json(empleado)
    } catch (error: any) {
            console.log(error)
            res.status(500).json({ error: ERROR_SERVER })
    }
}

export const deleteEmpleado = async (req: Request, res: Response): Promise<void> => {
    const Id = parseInt(req.params.id)
    try {
        const empleado = await prisma.empleado.findUnique({
            where: {
                id: Id
            }
        })
        if (!empleado) {
            res.status(404).json({ error: ERROR_SERVER })
            return
        }

       const deleteEmpleado = await prisma.empleado.delete({
            where: {
                id: Id
            }
        })
        console.log(deleteEmpleado)
        res.status(200).json(deleteEmpleado).end()

    } catch (error: any) {
         console.log(error)
        res.status(500).json({ error: ERROR_SERVER })
    }
}