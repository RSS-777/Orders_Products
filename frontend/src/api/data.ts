import type {IProduct} from '../types/product'
import type { IApiResponse } from '../types/api';
import type { IOrder } from '../types/order';
import type { IUser } from '../types/user';

export const products: IProduct[] = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: '',
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
    photo: '',
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
    photo: '',
    title: 'Gigabyte X870 AORUS ELITE WIFI7 ICE (sAM5, AMD X870, PCI-Ex16)',
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
    photo: '',
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
    photo: '',
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
    order: 0,
    date: '2017-07-02 12:09:33'
  },
  {
    id: 6,
    serialNumber: 1537,
    isNew: 0, 
    photo: '',
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
    order: 2,
    date: '2017-07-02 12:09:33'
  },
  {
    id: 7,
    serialNumber: 1537,
    isNew: 0, 
    photo: '',
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
    order: 2,
    date: '2017-07-02 12:09:33'
  },
  {
    id: 8,
    serialNumber: 1537,
    isNew: 0, 
    photo: '',
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
    order: 2,
    date: '2017-07-02 12:09:33'
  },
  {
    id: 9,
    serialNumber: 1537,
    isNew: 1, 
    photo: '',
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
    order: 2,
    date: '2017-07-02 12:09:33'
  },
  {
    id: 10,
    serialNumber: 1537,
    isNew: 0, 
    photo: '',
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
    order: 2,
    date: '2017-07-02 12:09:33'
  },
  {
    id: 11,
    serialNumber: 2001,
    isNew: 1,
    photo: '',
    title: 'Ноутбук Lenovo ThinkPad X1',
    type: 'Laptops',
    specification: 'Intel i7, 16GB RAM, 512GB SSD',
    guarantee: { start: '2017-08-01 12:09:33', end: '2018-08-01 12:09:33' },
    price: [
      { value: 1200, symbol: 'USD', isDefault: 1 },
      { value: 36000, symbol: 'UAH', isDefault: 0 }
    ],
    order: 0,
    date: '2017-08-01 12:09:33'
  },
  {
    id: 12,
    serialNumber: 2002,
    isNew: 0,
    photo: '',
    title: 'Монитор Dell UltraSharp 27"',
    type: 'Monitors',
    specification: 'IPS, 4K, 60Hz',
    guarantee: { start: '2017-08-01 12:09:33', end: '2018-08-01 12:09:33' },
    price: [
      { value: 450, symbol: 'USD', isDefault: 1 },
      { value: 13500, symbol: 'UAH', isDefault: 0 }
    ],
    order: 6,
    date: '2017-08-01 12:09:33'
  },
  {
    id: 13,
    serialNumber: 2003,
    isNew: 1,
    photo: '',
    title: 'Клавиатура Logitech MX Keys',
    type: 'Accessories',
    specification: 'Bluetooth, черная',
    guarantee: { start: '2017-08-01 12:09:33', end: '2018-08-01 12:09:33' },
    price: [
      { value: 100, symbol: 'USD', isDefault: 1 },
      { value: 3000, symbol: 'UAH', isDefault: 0 }
    ],
    order: 6,
    date: '2017-08-01 12:09:33'
  },
  {
    id: 14,
    serialNumber: 2101,
    isNew: 1,
    photo: '',
    title: 'Принтер HP LaserJet Pro M404dn',
    type: 'Printers',
    specification: 'Ч/Б, 40 стр/мин',
    guarantee: { start: '2017-08-02 12:09:33', end: '2018-08-02 12:09:33' },
    price: [
      { value: 300, symbol: 'USD', isDefault: 1 },
      { value: 9000, symbol: 'UAH', isDefault: 0 }
    ],
    order: 7,
    date: '2017-08-02 12:09:33'
  },
  {
    id: 15,
    serialNumber: 2102,
    isNew: 0,
    photo: '',
    title: 'Сканер Canon CanoScan LiDE 400',
    type: 'Scanners',
    specification: '4800 dpi, USB',
    guarantee: { start: '2017-08-02 12:09:33', end: '2018-08-02 12:09:33' },
    price: [
      { value: 120, symbol: 'USD', isDefault: 1 },
      { value: 3600, symbol: 'UAH', isDefault: 0 }
    ],
    order: 0,
    date: '2017-08-02 12:09:33'
  },
  {
    id: 16,
    serialNumber: 2201,
    isNew: 1,
    photo: '',
    title: 'Проектор Epson EB-S41',
    type: 'Projectors',
    specification: 'SVGA, 3300 лм',
    guarantee: { start: '2017-08-03 12:09:33', end: '2018-08-03 12:09:33' },
    price: [
      { value: 400, symbol: 'USD', isDefault: 1 },
      { value: 12000, symbol: 'UAH', isDefault: 0 }
    ],
    order: 8,
    date: '2017-08-03 12:09:33'
  },
  {
    id: 17,
    serialNumber: 2202,
    isNew: 0,
    photo: '',
    title: 'Экран для проектора 120"',
    type: 'Projectors',
    specification: 'Manual pull-down',
    guarantee: { start: '2017-08-03 12:09:33', end: '2018-08-03 12:09:33' },
    price: [
      { value: 150, symbol: 'USD', isDefault: 1 },
      { value: 4500, symbol: 'UAH', isDefault: 0 }
    ],
    order: 8,
    date: '2017-08-03 12:09:33'
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
    title: 'Поставка офисной техники и комплектующих',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 1)
  },
  {
    id: 2,
    title: 'Заказ канцелярских товаров для нового отдела',
    date: '2017-06-29 12:09:33',
    description: 'Заказ содержит 10 продуктов: коробки, книги, канцтовары.',
    products: products.filter(p => p.order === 2)
  },
  {
    id: 3,
    title: 'Закупка мониторов и периферийных устройств',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 3)
  },
  {
    id: 4,
    title: 'Поставка ноутбуков для новых сотрудников',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 4)
  },
  {
    id: 5,
    title: 'Заказ серверного оборудования и комплектующих',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 5)
  },
  {
    id: 6,
    title: 'Закупка мебели для конференц-зала',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 6)
  },
  {
    id: 7,
    title: 'Поставка принтеров и расходных материалов',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 7)
  },
  {
    id: 8,
    title: 'Заказ программного обеспечения для бухгалтерии',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 8)
  },
  {
    id: 9,
    title: 'Поставка сетевого оборудования и роутеров',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 9)
  },
  {
    id: 10,
    title: 'Закупка кабельной продукции и аксессуаров',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 10)
  },
  {
    id: 11,
    title: 'Заказ офисной электроники для отдела продаж',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 11)
  },
  {
    id: 12,
    title: 'Поставка мониторов и док-станций для сотрудников',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 12)
  },
  {
    id: 13,
    title: 'Закупка проекторов и экранов для конференц-залов',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 13)
  },
  {
    id: 14,
    title: 'Поставка ноутбуков с предустановленным ПО',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 14)
  },
  {
    id: 15,
    title: 'Заказ периферийных устройств и аксессуаров',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter(p => p.order === 15)
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