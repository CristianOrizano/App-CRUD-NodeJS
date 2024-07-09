import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ValidationErrors } from "../helpers/validatorHelper";

export const validateLogin = [
    body('email')
      .isEmail().withMessage('Email no es válido')
      .notEmpty().withMessage('Email es requerido'),
    
    body('password')
      .isLength({ min: 3 }).withMessage('Password debe tener al menos 3 caracteres')
      .notEmpty().withMessage('Password es requerido'),
      
      (req:Request, res:Response, next:NextFunction) => {
        ValidationErrors(req, res, next)
      }
  ];