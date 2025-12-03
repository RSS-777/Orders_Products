import type { IProduct } from "./product";

export interface IOrder {
  id: number;
  title: string;
  date: string;  
  description: string;
  products: IProduct[];
}