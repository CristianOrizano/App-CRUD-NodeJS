import express from 'express'
import { createEmpleado, deleteEmpleado, getAllEmpleados, getEmpleadoById, updateEmpleado } from '../controller/empleadoController';
import { authenticateToken } from '../middlewares/auth.handler';
import { roleMiddleware } from '../middlewares/authorize.handler';

const router = express.Router()

router.get('/empleado',authenticateToken,getAllEmpleados)
//router.get('/empleado',authenticateToken,roleMiddleware('USER'),getAllEmpleados)
router.get('/empleado/:id',authenticateToken, getEmpleadoById)
router.post('/empleado',authenticateToken, createEmpleado)
//router.post('/empleado',authenticateToken, roleMiddleware('ADMIN'), createEmpleado)
router.put('/empleado/:id',authenticateToken, updateEmpleado)
router.delete('/empleado/:id',authenticateToken, deleteEmpleado)

export default router;