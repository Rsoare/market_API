import express, { Application } from 'express'
import { createProducts, deleteProduct, getAllProducts, getProductsById, updateProductsById } from './logic'
import {  checkDuplicateNameUpdate, checkDuplicateNameProduct, checkExistenceOfId } from './middlewares'

const app: Application = express()

app.use(express.json())

app.post('/products',checkDuplicateNameProduct,createProducts)

app.get('/products',getAllProducts)

app.get('/products/:id',checkExistenceOfId,getProductsById )

app.patch('/products/:id',checkExistenceOfId,checkDuplicateNameUpdate,updateProductsById)

app.delete('/products/:id',checkExistenceOfId,deleteProduct)


app.listen(3000, () => {
   console.log('Server started on port 3000');
   });

