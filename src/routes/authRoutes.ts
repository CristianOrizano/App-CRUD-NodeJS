import express from 'express'
import { login, register } from '../controller/authController';
import { validateUsuario } from '../validators/usuarioValidation';
import { validateLogin } from '../validators/loginValidation';


const router = express.Router()

router.post('/register',validateUsuario, register)
router.post('/login',validateLogin, login)

export default router;