import type {IProduct} from '../types/product'
import type { IApiResponse } from '../types/api';
import type { IOrder } from '../types/order';
import type { IUser } from '../types/user';

export const products: IProduct[] = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 1 },
      { value: 2600, symbol: 'UAH', isDefault: 0 }
    ],
    order: 1,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 }
    ],
    order: 2,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 3,
    serialNumber: 1236,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 3',
    type: 'Monitors',
    specification: 'Specification 3',
    guarantee: {
      start: '2017-07-01 12:09:33',
      end: '2017-08-01 12:09:33'
    },
    price: [
      { value: 0, symbol: 'USD', isDefault: 0 },
      { value: 5200, symbol: 'UAH', isDefault: 1 }
    ],
    order: 2,
    date: '2017-07-01 12:09:33'
  },
  {
    id: 4,
    serialNumber: 1237,
    isNew: 0, 
    photo: 'pathToFile.jpg',
    title: 'Product 4',
    type: 'Monitors',
    specification: 'Specification 4',
    guarantee: {
      start: '2017-07-02 12:09:33',
      end: '2017-08-02 12:09:33'
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 1 },
      { value: 0, symbol: 'UAH', isDefault: 0 }
    ],
    order: 4,
    date: '2017-07-02 12:09:33'
  },
  {
    id: 5,
    serialNumber: 1237,
    isNew: 0, 
    photo: 'pathToFile.jpg',
    title: 'Product 4',
    type: 'Monitors',
    specification: 'Specification 4',
    guarantee: {
      start: '2017-07-02 12:09:33',
      end: '2017-08-02 12:09:33'
    },
    price: [
      { value: 0, symbol: 'USD', isDefault: 0 },
      { value: 2400.788, symbol: 'UAH', isDefault: 1 }
    ],
    order: 5,
    date: '2017-07-02 12:09:33'
  }
];

export const getProducts = ():IApiResponse<IProduct[]> => {
    return {
      success: true,
      data: products,
    };
}

export const orders: IOrder[] = [
  {
    id: 1,
    title: 'Длинное предлинное длиннющее название прихода',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 1)
  },
  {
    id: 2,
    title: 'Длинное предлинное длиннющее',
    date: '2017-06-29 12:09:33',
    description: 'desc',
     products: products.filter(p => p.order === 2)
  },
  {
    id: 3,
    title: 'Длинное предлинное длиннющее название прихода',
    date: '2017-06-29 12:09:33',
    description: 'desc',
     products: products.filter(p => p.order === 3)
  },
  {
    id: 4,
    title: 'Длинное предлинное длиннющее название прихода',
    date: '2017-06-29 12:09:33',
    description: 'desc',
     products: products.filter(p => p.order === 4)
  },
  {
    id: 5,
    title: 'Длинное предлинное длиннющее название прихода',
    date: '2017-06-29 12:09:33',
    description: 'desc',
     products: products.filter(p => p.order === 5)
  }
];

export const  getOrders = (): IApiResponse<IOrder[]> => {
  return { 
    success: true, 
    data : orders
  };
}

export const users: IUser[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin',
    role: 'admin',
    photoUrl: ''
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'admin',
    role: 'manager',
    photoUrl: ''
  },
  {
    id: 3,
    name: 'Mark Smith',
    email: 'mark@example.com',
    password: 'admin',
    role: 'viewer',
    photoUrl: ''
  }
];

export const login = (email: string, password: string) => {
  const user = users[0]; 

    if (!user) {
    return {
      success: false,
      message: "No users found"
    };
  }

  if(email !== user.email || password !== user.password) {
    return {
      success: false,
      message: 'Incorrect email or password.'
    }
  }
  
  return {
    success: true,
    token: "mock-token-" + user.id, 
    userId: user.id,
    photoUrl: user.photoUrl
  };
};