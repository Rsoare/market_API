interface Iproduct {
   id:number
   name: string;
   price: number;
   weight: number;
   section: "food" | "cleaning";
   expirationDate:Date
}

type IproductRequest = Omit<Iproduct, 'id' | 'expirationDate'>

interface ICleanindProduct extends Iproduct {}

interface IFoodProduct extends Iproduct{
   calories:number
}

export {Iproduct,ICleanindProduct,IFoodProduct,IproductRequest}