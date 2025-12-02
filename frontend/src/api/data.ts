interface Price {
  value: number;
  symbol: string;
  isDefault: 0 | 1;
}

interface Guarantee {
  start: string; 
  end: string;
}

interface Product {
  id: number;
  serialNumber: number;
  isNew: 0 | 1;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: Price[];
  order: number; 
  date: string; 
}

interface Order {
  id: number;
  title: string;
  date: string; 
  description: string;
  products: Product[]; 
}


export const products: Product[] = [
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
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 }
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
  }
];

export const orders: Order[] = [
  {
    id: 1,
    title: 'Order 1',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() { return products.filter(p => p.order === this.id); }
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() { return products.filter(p => p.order === this.id); }
  },
  {
    id: 3,
    title: 'Order 3',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() { return products.filter(p => p.order === this.id); }
  }
];

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'viewer'; 
  photo: string; 
}

export const users: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin',
    role: 'admin',
    photo: 'default.png'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'admin',
    role: 'manager',
    photo: 'john.png'
  },
  {
    id: 3,
    name: 'Mark Smith',
    email: 'mark@example.com',
    password: 'admin',
    role: 'viewer',
    photo: 'mark.png'
  }
];
