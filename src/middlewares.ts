import { NextFunction, Request, Response } from "express";
import market from "./database";
import { IproductRequest } from "./interfaces";

const checkDuplicateNameProduct = (
   request: Request,
   response: Response,
   next: NextFunction
): Response | void => {
   const productName: string[] = [];
   const productListResponse: IproductRequest[] = request.body;

   productListResponse.map((product) => {
      productName.push(product.name);
   });

   const validatingProduct = market.find((product) => {
      if (productName.includes(product.name)) {
         return true;
      }
   });

   if (validatingProduct) {
      return response.status(409).json({
         error: "Product already registered",
      });
   }

   return next();
};

const checkExistenceOfId = (
   request: Request,
   response: Response,
   next: NextFunction
): Response | void => {
   const { id } = request.params;

   const productIndex = market.findIndex((product) => product.id == parseInt(id));

   if (productIndex == -1) {
      return response.status(404).json({
         error: "Product not found",
      });
   }

   response.locals.market = productIndex

   return next();
};

const checkDuplicateNameUpdate = (
   request: Request,
   response: Response,
   next: NextFunction
): Response | void => {
   const { name }: IproductRequest = request.body;

   const findDuplicateProduct = market.find((product) => product.name == name);

   if (findDuplicateProduct) {
      return response.status(409).json({
         error: "Product already registered",
      });
   }

   return next();
};

export { checkDuplicateNameProduct,checkExistenceOfId, checkDuplicateNameUpdate };
