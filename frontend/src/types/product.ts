export interface IPrice {
  value: number;
  symbol: string;
  isDefault: 0 | 1;
}

export interface IGuarantee {
  start: string; 
  end: string;
}

export interface IProduct {
  id: number;
  serialNumber: number;
  isNew: 0 | 1;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: IGuarantee;
  price: IPrice[];
  order: number;
  date: string; 
  owner: string;
  status: string;
}