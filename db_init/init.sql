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
    serialNumber INT NOT NULL,
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

INSERT INTO users (name, email, password, role, photoUrl)
VALUES (
    'Admin User',
    'admin@example.com',
    '$2b$10$hnkP6Z53lOQXAz7zzNbjzezjjrlSLn1lcqeeNwZQrhXfG3aSZAEIW',
    'admin',
    ''
);
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
    serialNumber INT NOT NULL,
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

INSERT INTO users (name, email, password, role, photoUrl)
VALUES (
    'Admin User',
    'admin@example.com',
    '$2b$10$hnkP6Z53lOQXAz7zzNbjzezjjrlSLn1lcqeeNwZQrhXfG3aSZAEIW',
    'admin',
    ''
);

INSERT INTO products (serialNumber, isNew, photo, title, type, specification, price_json, order_id, date, owner, status, guarantee_json)
VALUES
(1236, 1, NULL, 'Материнська плата Gigabyte X870 AORUS ELITE WIFI7 ICE', 'Motherboards', 'Specification 3', '[{"value":0,"symbol":"USD","isDefault":0},{"value":5200,"symbol":"UAH","isDefault":1}]', 2, '2017-07-01 14:03:55', 'Сидоров Сергей', 'ready', '{"start":"2017-07-01 14:03:55","end":"2018-07-01 14:03:55"}'),
(1237, 0, NULL, 'Принтер HP LaserJet Pro M404dn', 'Printers', '4800 dpi, U', '[{"value":100,"symbol":"USD","isDefault":0},{"value":2700,"symbol":"UAH","isDefault":1}]', 4, '2017-07-02 08:44:12', NULL, 'in_repair', '{"start":"2017-07-02 08:44:12","end":"2018-07-02 08:44:12"}'),
(1238, 1, NULL, 'Монітор Dell UltraSharp U2723QE', 'Monitors', '27" IPS, 4K', '[{"value":400,"symbol":"USD","isDefault":0},{"value":10800,"symbol":"UAH","isDefault":1}]', 1, '2017-07-03 10:12:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-03 10:12:00","end":"2018-07-03 10:12:00"}'),
(1239, 0, NULL, 'Клавіатура Logitech MX Keys', 'Keyboards', 'Wireless, Bluetooth', '[{"value":100,"symbol":"USD","isDefault":0},{"value":2700,"symbol":"UAH","isDefault":1}]', 5, '2017-07-04 12:00:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-04 12:00:00","end":"2018-07-04 12:00:00"}'),
(1240, 1, NULL, 'Миша Logitech MX Master 3', 'Mice', 'Wireless, Bluetooth', '[{"value":80,"symbol":"USD","isDefault":0},{"value":2160,"symbol":"UAH","isDefault":1}]', 3, '2017-07-05 09:30:00', 'Коваль Андрій', 'ready', '{"start":"2017-07-05 09:30:00","end":"2018-07-05 09:30:00"}'),
(1241, 0, NULL, 'Ноутбук ASUS ROG Zephyrus G15', 'Laptops', 'Ryzen 9, RTX 3080', '[{"value":1500,"symbol":"USD","isDefault":0},{"value":40500,"symbol":"UAH","isDefault":1}]', 6, '2017-07-06 14:15:00', 'Сидоренко Олексій', 'in_repair', '{"start":"2017-07-06 14:15:00","end":"2018-07-06 14:15:00"}'),
(1242, 1, NULL, 'Жорсткий диск Seagate 2TB', 'Storage', 'SATA III', '[{"value":90,"symbol":"USD","isDefault":0},{"value":2430,"symbol":"UAH","isDefault":1}]', 7, '2017-07-07 11:20:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-07 11:20:00","end":"2018-07-07 11:20:00"}'),
(1243, 0, NULL, 'SSD Samsung 1TB', 'Storage', 'NVMe PCIe 3.0', '[{"value":120,"symbol":"USD","isDefault":0},{"value":3240,"symbol":"UAH","isDefault":1}]', 8, '2017-07-08 15:10:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-08 15:10:00","end":"2018-07-08 15:10:00"}'),
(1244, 1, NULL, 'Материнська плата MSI MPG X670', 'Motherboards', 'Specification 5', '[{"value":0,"symbol":"USD","isDefault":0},{"value":7000,"symbol":"UAH","isDefault":1}]', 9, '2017-07-09 10:45:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-09 10:45:00","end":"2018-07-09 10:45:00"}'),
(1245, 0, NULL, 'Принтер Canon PIXMA G7020', 'Printers', 'All-in-One', '[{"value":120,"symbol":"USD","isDefault":0},{"value":3240,"symbol":"UAH","isDefault":1}]', 10, '2017-07-10 08:50:00', NULL, 'in_repair', '{"start":"2017-07-10 08:50:00","end":"2018-07-10 08:50:00"}'),
(1246, 1, NULL, 'Монітор LG 27UL850', 'Monitors', '27" 4K IPS', '[{"value":0,"symbol":"USD","isDefault":0},{"value":7500,"symbol":"UAH","isDefault":1}]', 1, '2017-07-11 09:00:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-11 09:00:00","end":"2018-07-11 09:00:00"}'),
(1247, 0, NULL, 'Ноутбук Lenovo ThinkPad X1 Carbon', 'Laptops', 'i7, 16GB RAM', '[{"value":1200,"symbol":"USD","isDefault":0},{"value":32400,"symbol":"UAH","isDefault":1}]', 2, '2017-07-11 10:30:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-11 10:30:00","end":"2018-07-11 10:30:00"}'),
(1248, 1, NULL, 'Клавіатура Razer BlackWidow', 'Keyboards', 'Mechanical, RGB', '[{"value":150,"symbol":"USD","isDefault":0},{"value":4050,"symbol":"UAH","isDefault":1}]', 3, '2017-07-12 11:00:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-12 11:00:00","end":"2018-07-12 11:00:00"}'),
(1249, 0, NULL, 'Миша Logitech G502', 'Mice', 'Wired Gaming', '[{"value":70,"symbol":"USD","isDefault":0},{"value":1890,"symbol":"UAH","isDefault":1}]', 4, '2017-07-12 12:15:00', 'Коваль Андрій', 'in_repair', '{"start":"2017-07-12 12:15:00","end":"2018-07-12 12:15:00"}'),
(1250, 1, NULL, 'Принтер Epson EcoTank L3150', 'Printers', 'All-in-One', '[{"value":110,"symbol":"USD","isDefault":0},{"value":2970,"symbol":"UAH","isDefault":1}]', 5, '2017-07-13 09:30:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-13 09:30:00","end":"2018-07-13 09:30:00"}'),
(1251, 0, NULL, 'SSD Crucial P5 500GB', 'Storage', 'NVMe PCIe 3.0', '[{"value":80,"symbol":"USD","isDefault":0},{"value":2160,"symbol":"UAH","isDefault":1}]', 6, '2017-07-13 11:45:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-13 11:45:00","end":"2018-07-13 11:45:00"}'),
(1252, 1, NULL, 'Жорсткий диск WD Blue 1TB', 'Storage', 'SATA III', '[{"value":50,"symbol":"USD","isDefault":0},{"value":1350,"symbol":"UAH","isDefault":1}]', 7, '2017-07-14 10:00:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-14 10:00:00","end":"2018-07-14 10:00:00"}'),
(1253, 0, NULL, 'Монітор Samsung Odyssey G7', 'Monitors', '27" QHD 240Hz', '[{"value":600,"symbol":"USD","isDefault":0},{"value":16200,"symbol":"UAH","isDefault":1}]', 8, '2017-07-14 12:30:00', 'Коваль Андрій', 'in_repair', '{"start":"2017-07-14 12:30:00","end":"2018-07-14 12:30:00"}'),
(1254, 1, NULL, 'Ноутбук HP Spectre x360', 'Laptops', 'i5, 16GB RAM', '[{"value":1000,"symbol":"USD","isDefault":0},{"value":27000,"symbol":"UAH","isDefault":1}]', 9, '2017-07-15 09:15:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-15 09:15:00","end":"2018-07-15 09:15:00"}'),
(1255, 0, NULL, 'Клавіатура SteelSeries Apex 7', 'Keyboards', 'Mechanical, RGB', '[{"value":140,"symbol":"USD","isDefault":0},{"value":3780,"symbol":"UAH","isDefault":1}]', 10, '2017-07-15 10:45:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-15 10:45:00","end":"2018-07-15 10:45:00"}'),
(1256, 1, NULL, 'Миша Razer DeathAdder V2', 'Mice', 'Wired Gaming', '[{"value":65,"symbol":"USD","isDefault":0},{"value":1755,"symbol":"UAH","isDefault":1}]', 1, '2017-07-16 11:00:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-16 11:00:00","end":"2018-07-16 11:00:00"}'),
(1257, 0, NULL, 'Принтер Brother HL-L2350DW', 'Printers', 'Monochrome', '[{"value":90,"symbol":"USD","isDefault":0},{"value":2430,"symbol":"UAH","isDefault":1}]', 2, '2017-07-16 13:20:00', 'Коваль Андрій', 'in_repair', '{"start":"2017-07-16 13:20:00","end":"2018-07-16 13:20:00"}'),
(1258, 1, NULL, 'SSD Samsung 970 EVO Plus 1TB', 'Storage', 'NVMe PCIe 3.0', '[{"value":130,"symbol":"USD","isDefault":0},{"value":3510,"symbol":"UAH","isDefault":1}]', 3, '2017-07-17 09:00:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-17 09:00:00","end":"2018-07-17 09:00:00"}'),
(1259, 0, NULL, 'Жорсткий диск Seagate 4TB', 'Storage', 'SATA III', '[{"value":120,"symbol":"USD","isDefault":0},{"value":3240,"symbol":"UAH","isDefault":1}]', 4, '2017-07-17 11:30:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-17 11:30:00","end":"2018-07-17 11:30:00"}'),
(1260, 1, NULL, 'Монітор Acer Predator XB273K', 'Monitors', '27" 4K 144Hz', '[{"value":550,"symbol":"USD","isDefault":0},{"value":14850,"symbol":"UAH","isDefault":1}]', 5, '2017-07-18 10:15:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-18 10:15:00","end":"2018-07-18 10:15:00"}'),
(1261, 0, NULL, 'Ноутбук Dell XPS 15', 'Laptops', 'i7, 16GB RAM', '[{"value":1400,"symbol":"USD","isDefault":0},{"value":37800,"symbol":"UAH","isDefault":1}]', 6, '2017-07-18 12:45:00', 'Коваль Андрій', 'in_repair', '{"start":"2017-07-18 12:45:00","end":"2018-07-18 12:45:00"}'),
(1262, 1, NULL, 'Клавіатура Corsair K70 RGB', 'Keyboards', 'Mechanical, RGB', '[{"value":130,"symbol":"USD","isDefault":0},{"value":3510,"symbol":"UAH","isDefault":1}]', 7, '2017-07-19 09:20:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-19 09:20:00","end":"2018-07-19 09:20:00"}'),
(1263, 0, NULL, 'Миша Logitech G Pro X', 'Mice', 'Wireless Gaming', '[{"value":90,"symbol":"USD","isDefault":0},{"value":2430,"symbol":"UAH","isDefault":1}]', 8, '2017-07-19 11:50:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-19 11:50:00","end":"2018-07-19 11:50:00"}'),
(1264, 1, NULL, 'Принтер Canon LBP6230dw', 'Printers', 'Monochrome', '[{"value":100,"symbol":"USD","isDefault":0},{"value":2700,"symbol":"UAH","isDefault":1}]', 9, '2017-07-20 10:05:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-20 10:05:00","end":"2018-07-20 10:05:00"}'),
(1265, 0, NULL, 'SSD WD Black SN750 1TB', 'Storage', 'NVMe PCIe 3.0', '[{"value":140,"symbol":"USD","isDefault":0},{"value":3780,"symbol":"UAH","isDefault":1}]', 10, '2017-07-20 12:35:00', 'Коваль Андрій', 'in_repair', '{"start":"2017-07-20 12:35:00","end":"2018-07-20 12:35:00"}');


INSERT INTO orders (title, description, date)
VALUES
('Замовлення офісного обладнання для нового відділу', 'Замовлення містить 10 продуктів: монітори, клавіатури, миші.', '2017-07-01 09:00:00'),
('Заказ канцелярських товарів для нового отдела', 'Заказ содержит 10 продуктов: коробки, книги, канцтовары.', '2017-07-02 09:15:12'),
('Закупівля комп’ютерної техніки для IT-відділу', 'Включає 5 ноутбуків, 5 моніторів та аксесуари.', '2017-07-03 10:30:00'),
('Замовлення периферії для нових робочих місць', 'Клавіатури, миші, принтери.', '2017-07-04 11:45:00'),
('Закупівля серверного обладнання', 'Сервери, накопичувачі, мережеве обладнання.', '2017-07-05 09:20:00'),
('Замовлення для бухгалтерії', 'Принтери, сканери, канцелярія.', '2017-07-06 10:10:00'),
('Закупівля матеріалів для презентацій', 'Проектори, екрани, кабелі.', '2017-07-07 14:05:00'),
('Замовлення для нового складу', 'Раковини, полиці, органайзери.', '2017-07-08 08:50:00'),
('Закупівля обладнання для конференц-зали', 'Монітори, мікрофони, колонки.', '2017-07-09 12:30:00'),
('Замовлення для відділу продажів', 'Ноутбуки, телефони, гарнітури.', '2017-07-10 11:15:00'),
('Закупівля для відділу маркетингу', 'Принтери, планшети, фототехніка.', '2017-07-11 10:05:00'),
('Замовлення для нового проекту', 'Комп’ютери, клавіатури, миші, монітори.', '2017-07-12 09:45:00'),
('Закупівля для складу запасних частин', 'Жорсткі диски, SSD, кабелі, адаптери.', '2017-07-13 14:20:00'),
('Замовлення для відділу підтримки', 'Монітори, гарнітури, клавіатури.', '2017-07-14 08:40:00'),
('Закупівля для адміністративного відділу', 'Принтери, сканери, меблі.', '2017-07-15 11:30:00');

INSERT INTO products (serialNumber, isNew, photo, title, type, specification, price_json, order_id, date, owner, status, guarantee_json)
VALUES
(1236, 1, NULL, 'Материнська плата Gigabyte X870 AORUS ELITE WIFI7 ICE', 'Motherboards', 'Specification 3', '[{"value":0,"symbol":"USD","isDefault":0},{"value":5200,"symbol":"UAH","isDefault":1}]', 2, '2017-07-01 14:03:55', 'Сидоров Сергей', 'ready', '{"start":"2017-07-01 14:03:55","end":"2018-07-01 14:03:55"}'),
(1237, 0, NULL, 'Принтер HP LaserJet Pro M404dn', 'Printers', '4800 dpi, U', '[{"value":100,"symbol":"USD","isDefault":0},{"value":2700,"symbol":"UAH","isDefault":1}]', 4, '2017-07-02 08:44:12', NULL, 'in_repair', '{"start":"2017-07-02 08:44:12","end":"2018-07-02 08:44:12"}'),
(1238, 1, NULL, 'Монітор Dell UltraSharp U2723QE', 'Monitors', '27" IPS, 4K', '[{"value":400,"symbol":"USD","isDefault":0},{"value":10800,"symbol":"UAH","isDefault":1}]', 1, '2017-07-03 10:12:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-03 10:12:00","end":"2018-07-03 10:12:00"}'),
(1239, 0, NULL, 'Клавіатура Logitech MX Keys', 'Keyboards', 'Wireless, Bluetooth', '[{"value":100,"symbol":"USD","isDefault":0},{"value":2700,"symbol":"UAH","isDefault":1}]', 5, '2017-07-04 12:00:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-04 12:00:00","end":"2018-07-04 12:00:00"}'),
(1240, 1, NULL, 'Миша Logitech MX Master 3', 'Mice', 'Wireless, Bluetooth', '[{"value":80,"symbol":"USD","isDefault":0},{"value":2160,"symbol":"UAH","isDefault":1}]', 3, '2017-07-05 09:30:00', 'Коваль Андрій', 'ready', '{"start":"2017-07-05 09:30:00","end":"2018-07-05 09:30:00"}'),
(1241, 0, NULL, 'Ноутбук ASUS ROG Zephyrus G15', 'Laptops', 'Ryzen 9, RTX 3080', '[{"value":1500,"symbol":"USD","isDefault":0},{"value":40500,"symbol":"UAH","isDefault":1}]', 6, '2017-07-06 14:15:00', 'Сидоренко Олексій', 'in_repair', '{"start":"2017-07-06 14:15:00","end":"2018-07-06 14:15:00"}'),
(1242, 1, NULL, 'Жорсткий диск Seagate 2TB', 'Storage', 'SATA III', '[{"value":90,"symbol":"USD","isDefault":0},{"value":2430,"symbol":"UAH","isDefault":1}]', 7, '2017-07-07 11:20:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-07 11:20:00","end":"2018-07-07 11:20:00"}'),
(1243, 0, NULL, 'SSD Samsung 1TB', 'Storage', 'NVMe PCIe 3.0', '[{"value":120,"symbol":"USD","isDefault":0},{"value":3240,"symbol":"UAH","isDefault":1}]', 8, '2017-07-08 15:10:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-08 15:10:00","end":"2018-07-08 15:10:00"}'),
(1244, 1, NULL, 'Материнська плата MSI MPG X670', 'Motherboards', 'Specification 5', '[{"value":0,"symbol":"USD","isDefault":0},{"value":7000,"symbol":"UAH","isDefault":1}]', 9, '2017-07-09 10:45:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-09 10:45:00","end":"2018-07-09 10:45:00"}'),
(1245, 0, NULL, 'Принтер Canon PIXMA G7020', 'Printers', 'All-in-One', '[{"value":120,"symbol":"USD","isDefault":0},{"value":3240,"symbol":"UAH","isDefault":1}]', 10, '2017-07-10 08:50:00', NULL, 'in_repair', '{"start":"2017-07-10 08:50:00","end":"2018-07-10 08:50:00"}'),
(1246, 1, NULL, 'Монітор LG 27UL850', 'Monitors', '27" 4K IPS', '[{"value":0,"symbol":"USD","isDefault":0},{"value":7500,"symbol":"UAH","isDefault":1}]', 1, '2017-07-11 09:00:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-11 09:00:00","end":"2018-07-11 09:00:00"}'),
(1247, 0, NULL, 'Ноутбук Lenovo ThinkPad X1 Carbon', 'Laptops', 'i7, 16GB RAM', '[{"value":1200,"symbol":"USD","isDefault":0},{"value":32400,"symbol":"UAH","isDefault":1}]', 2, '2017-07-11 10:30:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-11 10:30:00","end":"2018-07-11 10:30:00"}'),
(1248, 1, NULL, 'Клавіатура Razer BlackWidow', 'Keyboards', 'Mechanical, RGB', '[{"value":150,"symbol":"USD","isDefault":0},{"value":4050,"symbol":"UAH","isDefault":1}]', 3, '2017-07-12 11:00:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-12 11:00:00","end":"2018-07-12 11:00:00"}'),
(1249, 0, NULL, 'Миша Logitech G502', 'Mice', 'Wired Gaming', '[{"value":70,"symbol":"USD","isDefault":0},{"value":1890,"symbol":"UAH","isDefault":1}]', 4, '2017-07-12 12:15:00', 'Коваль Андрій', 'in_repair', '{"start":"2017-07-12 12:15:00","end":"2018-07-12 12:15:00"}'),
(1250, 1, NULL, 'Принтер Epson EcoTank L3150', 'Printers', 'All-in-One', '[{"value":110,"symbol":"USD","isDefault":0},{"value":2970,"symbol":"UAH","isDefault":1}]', 5, '2017-07-13 09:30:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-13 09:30:00","end":"2018-07-13 09:30:00"}'),
(1251, 0, NULL, 'SSD Crucial P5 500GB', 'Storage', 'NVMe PCIe 3.0', '[{"value":80,"symbol":"USD","isDefault":0},{"value":2160,"symbol":"UAH","isDefault":1}]', 6, '2017-07-13 11:45:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-13 11:45:00","end":"2018-07-13 11:45:00"}'),
(1252, 1, NULL, 'Жорсткий диск WD Blue 1TB', 'Storage', 'SATA III', '[{"value":50,"symbol":"USD","isDefault":0},{"value":1350,"symbol":"UAH","isDefault":1}]', 7, '2017-07-14 10:00:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-14 10:00:00","end":"2018-07-14 10:00:00"}'),
(1253, 0, NULL, 'Монітор Samsung Odyssey G7', 'Monitors', '27" QHD 240Hz', '[{"value":600,"symbol":"USD","isDefault":0},{"value":16200,"symbol":"UAH","isDefault":1}]', 8, '2017-07-14 12:30:00', 'Коваль Андрій', 'in_repair', '{"start":"2017-07-14 12:30:00","end":"2018-07-14 12:30:00"}'),
(1254, 1, NULL, 'Ноутбук HP Spectre x360', 'Laptops', 'i5, 16GB RAM', '[{"value":1000,"symbol":"USD","isDefault":0},{"value":27000,"symbol":"UAH","isDefault":1}]', 9, '2017-07-15 09:15:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-15 09:15:00","end":"2018-07-15 09:15:00"}'),
(1255, 0, NULL, 'Клавіатура SteelSeries Apex 7', 'Keyboards', 'Mechanical, RGB', '[{"value":140,"symbol":"USD","isDefault":0},{"value":3780,"symbol":"UAH","isDefault":1}]', 10, '2017-07-15 10:45:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-15 10:45:00","end":"2018-07-15 10:45:00"}'),
(1256, 1, NULL, 'Миша Razer DeathAdder V2', 'Mice', 'Wired Gaming', '[{"value":65,"symbol":"USD","isDefault":0},{"value":1755,"symbol":"UAH","isDefault":1}]', 1, '2017-07-16 11:00:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-16 11:00:00","end":"2018-07-16 11:00:00"}'),
(1257, 0, NULL, 'Принтер Brother HL-L2350DW', 'Printers', 'Monochrome', '[{"value":90,"symbol":"USD","isDefault":0},{"value":2430,"symbol":"UAH","isDefault":1}]', 2, '2017-07-16 13:20:00', 'Коваль Андрій', 'in_repair', '{"start":"2017-07-16 13:20:00","end":"2018-07-16 13:20:00"}'),
(1258, 1, NULL, 'SSD Samsung 970 EVO Plus 1TB', 'Storage', 'NVMe PCIe 3.0', '[{"value":130,"symbol":"USD","isDefault":0},{"value":3510,"symbol":"UAH","isDefault":1}]', 3, '2017-07-17 09:00:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-17 09:00:00","end":"2018-07-17 09:00:00"}'),
(1259, 0, NULL, 'Жорсткий диск Seagate 4TB', 'Storage', 'SATA III', '[{"value":120,"symbol":"USD","isDefault":0},{"value":3240,"symbol":"UAH","isDefault":1}]', 4, '2017-07-17 11:30:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-17 11:30:00","end":"2018-07-17 11:30:00"}'),
(1260, 1, NULL, 'Монітор Acer Predator XB273K', 'Monitors', '27" 4K 144Hz', '[{"value":550,"symbol":"USD","isDefault":0},{"value":14850,"symbol":"UAH","isDefault":1}]', 5, '2017-07-18 10:15:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-18 10:15:00","end":"2018-07-18 10:15:00"}'),
(1261, 0, NULL, 'Ноутбук Dell XPS 15', 'Laptops', 'i7, 16GB RAM', '[{"value":1400,"symbol":"USD","isDefault":0},{"value":37800,"symbol":"UAH","isDefault":1}]', 6, '2017-07-18 12:45:00', 'Коваль Андрій', 'in_repair', '{"start":"2017-07-18 12:45:00","end":"2018-07-18 12:45:00"}'),
(1262, 1, NULL, 'Клавіатура Corsair K70 RGB', 'Keyboards', 'Mechanical, RGB', '[{"value":130,"symbol":"USD","isDefault":0},{"value":3510,"symbol":"UAH","isDefault":1}]', 7, '2017-07-19 09:20:00', 'Іваненко Ігор', 'ready', '{"start":"2017-07-19 09:20:00","end":"2018-07-19 09:20:00"}'),
(1263, 0, NULL, 'Миша Logitech G Pro X', 'Mice', 'Wireless Gaming', '[{"value":90,"symbol":"USD","isDefault":0},{"value":2430,"symbol":"UAH","isDefault":1}]', 8, '2017-07-19 11:50:00', 'Петренко Олег', 'in_repair', '{"start":"2017-07-19 11:50:00","end":"2018-07-19 11:50:00"}'),
(1264, 1, NULL, 'Принтер Canon LBP6230dw', 'Printers', 'Monochrome', '[{"value":100,"symbol":"USD","isDefault":0},{"value":2700,"symbol":"UAH","isDefault":1}]', 9, '2017-07-20 10:05:00', 'Сидоров Сергей', 'ready', '{"start":"2017-07-20 10:05:00","end":"2018-07-20 10:05:00"}'),
(1265, 0, NULL, 'SSD WD Black SN750 1TB', 'Storage', 'NVMe PCIe 3.0', '[{"value":140,"symbol":"USD","isDefault":0},{"value":3780,"symbol":"UAH","isDefault":1}]', 10, '2017-07-20 12:35:00', 'Коваль Андрій', 'in_repair', '{"start":"2017-07-20 12:35:00","end":"2018-07-20 12:35:00"}');



