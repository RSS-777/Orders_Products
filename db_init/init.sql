CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','manager','viewer') NOT NULL DEFAULT 'viewer',
    photoUrl VARCHAR(255) NULL
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    date DATETIME NOT NULL
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    serialNumber VARCHAR(50) NOT NULL,
    isNew TINYINT(1) DEFAULT 1,
    photo VARCHAR(255) NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NULL,
    specification TEXT NULL,
    price_json JSON NULL,
    order_id INT NULL,
    date DATETIME NULL,
    owner VARCHAR(255) NULL,
    status ENUM('in_repair','ready') DEFAULT 'ready',
    guarantee_json JSON NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    `key` VARCHAR(100) NOT NULL UNIQUE,
    `value` VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL
);

INSERT INTO orders (title, description, date) VALUES
('Ремонт ноутбуків для офісу', 'Включає 3 пристрої: 2 ноутбуки та 1 принтер', '2025-12-01 09:00:00'),
('Обслуговування мережевого обладнання', 'Перевірка та заміна кабелів, комутаторів', '2025-12-02 10:30:00'),
('Ремонт мобільних пристроїв', '5 телефонів для співробітників', '2025-12-03 11:00:00'),
('Технічне обслуговування серверів', 'Сервера потребують чистки та апгрейду', '2025-12-04 09:15:00'),
('Заміна моніторів', '3 монітори з поламаними матрицями', '2025-12-05 14:00:00'),
('Ремонт принтерів', '2 лазерні принтери та 1 струменевий', '2025-12-06 13:30:00'),
('Обслуговування ПК', '4 стаціонарні комп’ютери для нового відділу', '2025-12-07 10:45:00'),
('Ремонт ноутбуків', '2 ноутбуки HP', '2025-12-08 09:20:00'),
('Заміна батарей мобільних', '3 батареї для телефонів', '2025-12-09 15:00:00'),
('Перевірка мережі', 'Тестування маршрутизаторів та комутаторів', '2025-12-10 11:15:00'),
('Обслуговування проекторів', '2 проектори для конференц-залів', '2025-12-11 14:30:00'),
('Ремонт планшетів', '3 планшети Apple та Samsung', '2025-12-12 09:45:00'),
('Перевірка серверного обладнання', 'Сервера та комутатори', '2025-12-13 10:00:00'),
('Обслуговування офісних пристроїв', 'Принтери та сканери', '2025-12-14 13:00:00'),
('Ремонт ноутбуків Lenovo', '2 ноутбуки Lenovo ThinkPad', '2025-12-15 09:30:00');

INSERT INTO products (serialNumber, isNew, photo, title, type, specification, price_json, order_id, date, owner, status, guarantee_json) VALUES
('SN-20001', 1, '', 'Ноутбук Lenovo ThinkPad T14', 'Laptop', 'Intel i5, 16GB RAM, 512GB SSD', '[{"value":1200,"symbol":"USD","isDefault":0},{"value":45000,"symbol":"UAH","isDefault":1}]', 1, '2025-12-01 09:30:00', 'Іванов І.', 'in_repair', '{"start":"2025-12-01","end":"2026-12-01"}'),
('SN-20002', 0, '', 'Принтер HP LaserJet', 'Printer', 'Laser, 20ppm', '[{"value":200,"symbol":"USD","isDefault":0},{"value":7500,"symbol":"UAH","isDefault":1}]', 1, '2025-12-01 09:40:00', 'Петренко П.', 'ready', '{"start":"2025-12-01","end":"2026-12-01"}'),
('SN-20003', 1, '', 'Ноутбук Dell XPS 13', 'Laptop', 'Intel i7, 16GB RAM, 1TB SSD', '[{"value":1500,"symbol":"USD","isDefault":0},{"value":56000,"symbol":"UAH","isDefault":1}]', 1, '2025-12-01 09:50:00', 'Сидоренко С.', 'ready', '{"start":"2025-12-01","end":"2026-12-01"}'),
('SN-21001', 1, '', 'Комутатор Netgear GS108', 'Networking', '8 портів, Gigabit', '[{"value":60,"symbol":"USD","isDefault":0},{"value":2250,"symbol":"UAH","isDefault":1}]', 2, '2025-12-02 10:40:00', 'Іванов І.', 'in_repair', '{"start":"2025-12-02","end":"2026-12-02"}'),
('SN-21002', 1, '', 'Маршрутизатор TP-Link TL-WR841N', 'Networking', '300Mbps, 4 порти', '[{"value":25,"symbol":"USD","isDefault":0},{"value":950,"symbol":"UAH","isDefault":1}]', 2, '2025-12-02 10:50:00', 'Петренко П.', 'ready', '{"start":"2025-12-02","end":"2026-12-02"}'),
('SN-22001', 1, '', 'Смартфон Samsung Galaxy S21', 'Mobile', '128GB, Black', '[{"value":800,"symbol":"USD","isDefault":0},{"value":30000,"symbol":"UAH","isDefault":1}]', 3, '2025-12-03 11:10:00', 'Сидоренко С.', 'in_repair', '{"start":"2025-12-03","end":"2026-12-03"}'),
('SN-22002', 1, '', 'Смартфон iPhone 12', 'Mobile', '64GB, White', '[{"value":900,"symbol":"USD","isDefault":0},{"value":34000,"symbol":"UAH","isDefault":1}]', 3, '2025-12-03 11:20:00', 'Іванов І.', 'ready', '{"start":"2025-12-03","end":"2026-12-03"}'),
('SN-22003', 0, '', 'Смартфон Xiaomi Mi 11', 'Mobile', '128GB, Blue', '[{"value":700,"symbol":"USD","isDefault":0},{"value":26000,"symbol":"UAH","isDefault":1}]', 3, '2025-12-03 11:30:00', 'Петренко П.', 'ready', '{"start":"2025-12-03","end":"2026-12-03"}'),
('SN-23001', 0, '', 'Сервер Dell PowerEdge R740', 'Server', '2x Intel Xeon, 64GB RAM, 2TB SSD', '[{"value":5000,"symbol":"USD","isDefault":0},{"value":185000,"symbol":"UAH","isDefault":1}]', 4, '2025-12-04 09:20:00', 'Іванов І.', 'in_repair', '{"start":"2025-12-04","end":"2026-12-04"}'),
('SN-23002', 0, '', 'Сервер HP ProLiant DL380', 'Server', '2x Intel Xeon, 128GB RAM, 4TB SSD', '[{"value":7000,"symbol":"USD","isDefault":0},{"value":260000,"symbol":"UAH","isDefault":1}]', 4, '2025-12-04 09:40:00', 'Сидоренко С.', 'ready', '{"start":"2025-12-04","end":"2026-12-04"}'),
('SN-24001', 0, '', 'Монітор Dell UltraSharp 27"', 'Monitor', '2560x1440, IPS', '[{"value":400,"symbol":"USD","isDefault":0},{"value":14800,"symbol":"UAH","isDefault":1}]', 5, '2025-12-05 14:10:00', 'Петренко П.', 'in_repair', '{"start":"2025-12-05","end":"2026-12-05"}'),
('SN-24002', 0, '', 'Монітор LG 24"', 'Monitor', '1920x1080, IPS', '[{"value":200,"symbol":"USD","isDefault":0},{"value":7400,"symbol":"UAH","isDefault":1}]', 5, '2025-12-05 14:20:00', 'Іванов І.', 'ready', '{"start":"2025-12-05","end":"2026-12-05"}'),
('SN-25001', 0, '', 'Принтер Canon i-Sensys', 'Printer', 'Laser, 18ppm', '[{"value":180,"symbol":"USD","isDefault":0},{"value":6700,"symbol":"UAH","isDefault":1}]', 6, '2025-12-06 13:40:00', 'Сидоренко С.', 'in_repair', '{"start":"2025-12-06","end":"2026-12-06"}'),
('SN-25002', 1, '', 'Принтер HP DeskJet', 'Printer', 'Inkjet, 10ppm', '[{"value":120,"symbol":"USD","isDefault":0},{"value":4500,"symbol":"UAH","isDefault":1}]', 6, '2025-12-06 13:50:00', 'Іванов І.', 'ready', '{"start":"2025-12-06","end":"2026-12-06"}'),
('SN-25003', 0, '', 'Принтер Epson L3150', 'Printer', 'Inkjet, 15ppm', '[{"value":150,"symbol":"USD","isDefault":0},{"value":5600,"symbol":"UAH","isDefault":1}]', 6, '2025-12-06 14:00:00', 'Петренко П.', 'ready', '{"start":"2025-12-06","end":"2026-12-06"}'),
('SN-26001', 1, '', 'ПК Dell OptiPlex 7080', 'PC', 'Intel i5, 16GB RAM, 512GB SSD', '[{"value":1000,"symbol":"USD","isDefault":0},{"value":37000,"symbol":"UAH","isDefault":1}]', 7, '2025-12-07 11:00:00', 'Іванов І.', 'in_repair', '{"start":"2025-12-07","end":"2026-12-07"}'),
('SN-26002', 1, '', 'ПК HP EliteDesk 800', 'PC', 'Intel i7, 32GB RAM, 1TB SSD', '[{"value":1500,"symbol":"USD","isDefault":0},{"value":55500,"symbol":"UAH","isDefault":1}]', 7, '2025-12-07 11:15:00', 'Сидоренко С.', 'ready', '{"start":"2025-12-07","end":"2026-12-07"}'),
('SN-26003', 0, '', 'ПК Lenovo ThinkCentre M720', 'PC', 'Intel i5, 16GB RAM, 256GB SSD', '[{"value":900,"symbol":"USD","isDefault":0},{"value":33300,"symbol":"UAH","isDefault":1}]', 7, '2025-12-07 11:30:00', 'Петренко П.', 'ready', '{"start":"2025-12-07","end":"2026-12-07"}'),
('SN-27001', 1, '', 'Ноутбук HP EliteBook 840', 'Laptop', 'Intel i5, 8GB RAM, 256GB SSD', '[{"value":1200,"symbol":"USD","isDefault":0},{"value":45000,"symbol":"UAH","isDefault":1}]', 8, '2025-12-08 09:40:00', 'Іванов І.', 'in_repair', '{"start":"2025-12-08","end":"2026-12-08"}'),
('SN-27002', 1, '', 'Ноутбук HP ProBook 450', 'Laptop', 'Intel i7, 16GB RAM, 512GB SSD', '[{"value":1400,"symbol":"USD","isDefault":0},{"value":52000,"symbol":"UAH","isDefault":1}]', 8, '2025-12-08 09:50:00', 'Сидоренко С.', 'ready', '{"start":"2025-12-08","end":"2026-12-08"}'),
('SN-28001', 1, '', 'Батарея для iPhone 12', 'Accessory', 'Lithium-ion, 2815mAh', '[{"value":50,"symbol":"USD","isDefault":0},{"value":1850,"symbol":"UAH","isDefault":1}]', 9, '2025-12-09 15:10:00', 'Петренко П.', 'in_repair', '{"start":"2025-12-09","end":"2026-12-09"}'),
('SN-28002', 1, '', 'Батарея для Samsung Galaxy S21', 'Accessory', 'Lithium-ion, 4000mAh', '[{"value":60,"symbol":"USD","isDefault":0},{"value":2250,"symbol":"UAH","isDefault":1}]', 9, '2025-12-09 15:20:00', 'Іванов І.', 'ready', '{"start":"2025-12-09","end":"2026-12-09"}'),
('SN-29001', 1, '', 'Маршрутизатор Cisco RV340', 'Networking', 'Dual WAN, 4 порти', '[{"value":150,"symbol":"USD","isDefault":0},{"value":5550,"symbol":"UAH","isDefault":1}]', 10, '2025-12-10 11:30:00', 'Сидоренко С.', 'in_repair', '{"start":"2025-12-10","end":"2026-12-10"}'),
('SN-29002', 1, '', 'Комутатор Cisco SG250', 'Networking', '24 порти, Gigabit', '[{"value":200,"symbol":"USD","isDefault":0},{"value":7400,"symbol":"UAH","isDefault":1}]', 10, '2025-12-10 11:40:00', 'Петренко П.', 'ready', '{"start":"2025-12-10","end":"2026-12-10"}'),
('SN-30001', 0, '', 'Проектор Epson EB-X41', 'Projector', '3600 люмен, XGA', '[{"value":400,"symbol":"USD","isDefault":0},{"value":14800,"symbol":"UAH","isDefault":1}]', 11, '2025-12-11 14:40:00', 'Іванов І.', 'in_repair', '{"start":"2025-12-11","end":"2026-12-11"}'),
('SN-30002', 0, '', 'Проектор BenQ MW535', 'Projector', '3600 люмен, WXGA', '[{"value":350,"symbol":"USD","isDefault":0},{"value":12950,"symbol":"UAH","isDefault":1}]', 11, '2025-12-11 14:50:00', 'Сидоренко С.', 'ready', '{"start":"2025-12-11","end":"2026-12-11"}'),
('SN-31001', 1, '', 'Планшет Apple iPad 9', 'Tablet', '64GB, Silver', '[{"value":400,"symbol":"USD","isDefault":0},{"value":14800,"symbol":"UAH","isDefault":1}]', 12, '2025-12-12 09:50:00', 'Петренко П.', 'in_repair', '{"start":"2025-12-12","end":"2026-12-12"}'),
('SN-31002', 1, '', 'Планшет Samsung Galaxy Tab S7', 'Tablet', '128GB, Black', '[{"value":600,"symbol":"USD","isDefault":0},{"value":22200,"symbol":"UAH","isDefault":1}]', 12, '2025-12-12 10:00:00', 'Іванов І.', 'ready', '{"start":"2025-12-12","end":"2026-12-12"}'),
('SN-31003', 1, '', 'Планшет Huawei MatePad 11', 'Tablet', '128GB, Gray', '[{"value":500,"symbol":"USD","isDefault":0},{"value":18500,"symbol":"UAH","isDefault":1}]', 12, '2025-12-12 10:10:00', 'Сидоренко С.', 'ready', '{"start":"2025-12-12","end":"2026-12-12"}'),
('SN-32001', 0, '', 'Сервер Dell PowerEdge T40', 'Server', 'Intel Xeon E-2224G, 16GB RAM, 1TB HDD', '[{"value":1000,"symbol":"USD","isDefault":0},{"value":37000,"symbol":"UAH","isDefault":1}]', 13, '2025-12-13 10:10:00', 'Іванов І.', 'in_repair', '{"start":"2025-12-13","end":"2026-12-13"}'),
('SN-32002', 0, '', 'Комутатор Netgear GS716T', 'Networking', '16 портів, Gigabit', '[{"value":120,"symbol":"USD","isDefault":0},{"value":4440,"symbol":"UAH","isDefault":1}]', 13, '2025-12-13 10:20:00', 'Сидоренко С.', 'ready', '{"start":"2025-12-13","end":"2026-12-13"}'),
('SN-33001', 1, '', 'Принтер Canon PIXMA TS5340', 'Printer', 'Inkjet, 10ppm', '[{"value":100,"symbol":"USD","isDefault":0},{"value":3700,"symbol":"UAH","isDefault":1}]', 14, '2025-12-14 13:10:00', 'Петренко П.', 'in_repair', '{"start":"2025-12-14","end":"2026-12-14"}'),
('SN-33002', 1, '', 'Сканер Epson Perfection V39', 'Scanner', 'Flatbed, 4800dpi', '[{"value":80,"symbol":"USD","isDefault":0},{"value":2960,"symbol":"UAH","isDefault":1}]', 14, '2025-12-14 13:20:00', 'Іванов І.', 'ready', '{"start":"2025-12-14","end":"2026-12-14"}'),
('SN-34001', 1, '', 'Ноутбук Lenovo ThinkPad X1 Carbon', 'Laptop', 'Intel i7, 16GB RAM, 512GB SSD', '[{"value":1500,"symbol":"USD","isDefault":0},{"value":55500,"symbol":"UAH","isDefault":1}]', 15, '2025-12-15 09:40:00', 'Сидоренко С.', 'in_repair', '{"start":"2025-12-15","end":"2026-12-15"}');

INSERT INTO settings (`key`, `value`, description) VALUES
('default_currency', 'UAH', 'Валюта за замовчуванням');
