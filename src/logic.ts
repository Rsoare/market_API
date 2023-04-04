import {Request, Response } from "express";
import market from "./database";
import { ICleanindProduct, IFoodProduct, IproductRequest } from "./interfaces";

const createProducts = (request:Request,response:Response):Response =>{

   const newProductArray:Array<IFoodProduct | ICleanindProduct> = []

   let totalPrice = 0 

   const productExpiration = new Date()
   productExpiration.setDate(productExpiration.getDate() +365)
   
   const productsList:IproductRequest[] = request.body
   
   productsList.map(product => {

      const newId = market.length +1

      totalPrice += product.price


      const newProductsList: IFoodProduct | ICleanindProduct  = {
         id: newId,
         ...product,
         expirationDate: productExpiration,
      }

      market.push(newProductsList)
      newProductArray.push(newProductsList)
   })
   
   const productResponseObj = {
      total: totalPrice,
      marketProducts:newProductArray
   }
   
   return response.status(201).json(productResponseObj)

}

const getAllProducts = (request:Request,response:Response):Response =>{
   
   let totalPrice = 0 

   market.map(product => {
      totalPrice += product.price
   })

   const productResponseObj = {
      total: totalPrice,
      marketProducts:market
   }

   return response.json(productResponseObj)
}


const getProductsById = (request:Request,response:Response):Response =>{
   
   const {id} = request.params

   const productSelect = market.find(product => product.id == parseInt(id))

   return response.status(200).json(productSelect)

}

const updateProductsById = (request:Request,response:Response):Response =>{

   const {id} = request.params

   const newData:IproductRequest = request.body

   const productIndex = market.findIndex(product => product.id == parseInt(id))

   const currentProduct = market[productIndex]

   const productUpdate:IFoodProduct | ICleanindProduct  = {
         ...currentProduct,
         ...newData
   }

   market[productIndex] = productUpdate

   return response.status(200).json(productUpdate)
}


const deleteProduct = (resquest:Request,response:Response):Response=>{

   const {id} = resquest.params

   const productIndex = market.findIndex(product => product.id == parseInt(id))

   market.splice(productIndex,1)

   return response.status(204).send()
}

export {createProducts,getAllProducts,getProductsById,updateProductsById,deleteProduct}