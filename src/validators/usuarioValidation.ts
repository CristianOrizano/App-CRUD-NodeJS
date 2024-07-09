import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { ValidationErrors } from '../helpers/validatorHelper';


export const validateUsuario = [
    body('nombre')
      .notEmpty().withMessage('Nombre es requerido')
      .isLength({ max: 255 }).withMessage('Nombre debe tener menos de 255 caracteres'),
    
    body('apellido')
      .notEmpty().withMessage('Apellido es requerido')
      .isLength({ max: 255 }).withMessage('Apellido debe tener menos de 255 caracteres'),
    
    body('email')
      .isEmail().withMessage('Email no es válido')
      .notEmpty().withMessage('Email es requerido'),
    
    body('password')
      .isLength({ min: 3 }).withMessage('Password debe tener al menos 6 caracteres')
      .notEmpty().withMessage('Password es requerido'),
      
      (req:Request, res:Response, next:NextFunction) => {
        ValidationErrors(req, res, next)
      }
  ];