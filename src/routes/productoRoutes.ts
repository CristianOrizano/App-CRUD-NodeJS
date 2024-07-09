import express from 'express'
import { createProducto, deleteProducto, getAllProductos, getProductoById, updateProdcuto } from '../controller/productoController'


const router = express.Router()

router.get('/producto',getAllProductos)
router.get('/producto/:id', getProductoById)
router.post('/producto', createProducto)
router.put('/producto/:id', updateProdcuto)
router.delete('/producto/:id', deleteProducto)

export default router;