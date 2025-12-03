CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(50),
    photoUrl VARCHAR(255) NULL
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    date DATETIME,
    description TEXT
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    serialNumber INT,
    isNew TINYINT,
    photo VARCHAR(255),
    title VARCHAR(255),
    type VARCHAR(100),
    specification TEXT,
    guarantee_start DATETIME,
    guarantee_end DATETIME,
    price_usd DECIMAL(10,2),
    price_uah DECIMAL(10,2),
    order_id INT,
    date DATETIME
);

INSERT INTO users VALUES
(1, 'Admin User', 'admin@example.com', '$2b$10$EixZa...', 'admin', NULL),
(2, 'John Doe', 'john@example.com', '$2b$10$zX1K...', 'manager', NULL),
(3, 'Mark Smith', 'mark@example.com', '$2b$10$Qe8G...', 'viewer', NULL);

INSERT INTO orders VALUES 
(1, 'Order 1', '2017-06-29 12:09:33', 'desc'),
(2, 'Order 2', '2017-06-29 12:09:33', 'desc'),
(3, 'Order 3', '2017-06-29 12:09:33', 'desc');

INSERT INTO products VALUES
(1, 1234, 1, null, 'Product 1', 'Monitors', 'Specification 1',
 '2017-06-29 12:09:33', '2017-06-29 12:09:33', 100, 2600, 1, '2017-06-29 12:09:33'),
(2, 1234, 1, null, 'Product 1', 'Monitors', 'Specification 1',
 '2017-06-29 12:09:33', '2017-06-29 12:09:33', 100, 2600, 2, '2017-06-29 12:09:33');
