import express from 'express'
import { createCategoria, deleteCategoria, getAllCategorias, getCategoriaById, insertTwoCategoria, updateCategoria } from '../controller/categoriaController'

const router = express.Router()

router.get('/categoria',getAllCategorias)
router.get('/categoria/:id', getCategoriaById)
router.post('/categoria', createCategoria)
router.post('/categoriatwo', insertTwoCategoria)
router.put('/categoria/:id', updateCategoria)
router.delete('/categoria/:id', deleteCategoria)

export default router;