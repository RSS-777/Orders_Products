CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','manager','viewer') NOT NULL DEFAULT 'viewer',
    photoUrl VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    date DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    `key` VARCHAR(100) NOT NULL UNIQUE,
    `value` VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO orders (title, description, date) VALUES
('Ремонт ноутбуков для офиса', 'Включает 3 устройства: 2 ноутбука и 1 принтер', '2025-12-01 09:00:00'),
('Обслуживание сетевого оборудования', 'Проверка и замена кабелей, коммутаторов', '2025-12-02 10:30:00'),
('Ремонт мобильных устройств', '5 телефонов для сотрудников', '2025-12-03 11:00:00'),
('Техническое обслуживание серверов', 'Сервера требуют чистки и апгрейда', '2025-12-04 09:15:00'),
('Замена мониторов', '3 монитора с поломанными матрицами', '2025-12-05 14:00:00'),
('Ремонт принтеров', '2 лазерных принтера и 1 струйный', '2025-12-06 13:30:00'),
('Обслуживание ПК', '4 стационарных компьютера для нового отдела', '2025-12-07 10:45:00'),
('Ремонт ноутбуков', '2 ноутбука HP', '2025-12-08 09:20:00'),
('Замена батарей мобильных', '3 батареи для телефонов', '2025-12-09 15:00:00'),
('Проверка сети', 'Тестирование маршрутизаторов и коммутаторов', '2025-12-10 11:15:00'),
('Обслуживание проекторов', '2 проектора для конференц-залов', '2025-12-11 14:30:00'),
('Ремонт планшетов', '3 планшета Apple и Samsung', '2025-12-12 09:45:00'),
('Проверка серверного оборудования', 'Сервера и коммутаторы', '2025-12-13 10:00:00'),
('Обслуживание офисных устройств', 'Принтеры и сканеры', '2025-12-14 13:00:00'),
('Ремонт ноутбуков Lenovo', '2 ноутбука Lenovo ThinkPad', '2025-12-15 09:30:00');

INSERT INTO products (serialNumber, isNew, photo, title, type, specification, price_json, order_id, date, owner, status, guarantee_json) VALUES
('SN-20001', 1, '', 'Ноутбук Lenovo ThinkPad T14', 'Ноутбук', 'Intel i5, 16ГБ ОЗУ, 512ГБ SSD', '[{"value":1200,"symbol":"USD","isDefault":0},{"value":45000,"symbol":"UAH","isDefault":1}]', 1, '2025-12-01 09:30:00', 'Иванов И.', 'в ремонте', '{"start":"2025-12-01","end":"2026-12-01"}'),
('SN-20002', 0, '', 'Принтер HP LaserJet', 'Принтер', 'Лазерный, 20 стр/мин', '[{"value":200,"symbol":"USD","isDefault":0},{"value":7500,"symbol":"UAH","isDefault":1}]', 1, '2025-12-01 09:40:00', 'Петренко П.', 'готово', '{"start":"2025-12-01","end":"2026-12-01"}'),
('SN-20003', 1, '', 'Ноутбук Dell XPS 13', 'Ноутбук', 'Intel i7, 16ГБ ОЗУ, 1ТБ SSD', '[{"value":1500,"symbol":"USD","isDefault":0},{"value":56000,"symbol":"UAH","isDefault":1}]', 1, '2025-12-01 09:50:00', 'Сидоренко С.', 'готово', '{"start":"2025-12-01","end":"2026-12-01"}'),
('SN-21001', 1, '', 'Коммутатор Netgear GS108', 'Сетевое оборудование', '8 портов, Gigabit', '[{"value":60,"symbol":"USD","isDefault":0},{"value":2250,"symbol":"UAH","isDefault":1}]', 2, '2025-12-02 10:40:00', 'Иванов И.', 'в ремонте', '{"start":"2025-12-02","end":"2026-12-02"}'),
('SN-21002', 1, '', 'Маршрутизатор TP-Link TL-WR841N', 'Сетевое оборудование', '300Мбит/с, 4 порта', '[{"value":25,"symbol":"USD","isDefault":0},{"value":950,"symbol":"UAH","isDefault":1}]', 2, '2025-12-02 10:50:00', 'Петренко П.', 'готово', '{"start":"2025-12-02","end":"2026-12-02"}'),
('SN-22001', 1, '', 'Смартфон Samsung Galaxy S21', 'Мобильное устройство', '128ГБ, Черный', '[{"value":800,"symbol":"USD","isDefault":0},{"value":30000,"symbol":"UAH","isDefault":1}]', 3, '2025-12-03 11:10:00', 'Сидоренко С.', 'в ремонте', '{"start":"2025-12-03","end":"2026-12-03"}'),
('SN-22002', 1, '', 'Смартфон iPhone 12', 'Мобильное устройство', '64ГБ, Белый', '[{"value":900,"symbol":"USD","isDefault":0},{"value":34000,"symbol":"UAH","isDefault":1}]', 3, '2025-12-03 11:20:00', 'Иванов И.', 'готово', '{"start":"2025-12-03","end":"2026-12-03"}'),
('SN-22003', 0, '', 'Смартфон Xiaomi Mi 11', 'Мобильное устройство', '128ГБ, Синий', '[{"value":700,"symbol":"USD","isDefault":0},{"value":26000,"symbol":"UAH","isDefault":1}]', 3, '2025-12-03 11:30:00', 'Петренко П.', 'готово', '{"start":"2025-12-03","end":"2026-12-03"}'),
('SN-23001', 0, '', 'Сервер Dell PowerEdge R740', 'Сервер', '2x Intel Xeon, 64ГБ ОЗУ, 2ТБ SSD', '[{"value":5000,"symbol":"USD","isDefault":0},{"value":185000,"symbol":"UAH","isDefault":1}]', 4, '2025-12-04 09:20:00', 'Иванов И.', 'в ремонте', '{"start":"2025-12-04","end":"2026-12-04"}'),
('SN-23002', 0, '', 'Сервер HP ProLiant DL380', 'Сервер', '2x Intel Xeon, 128ГБ ОЗУ, 4ТБ SSD', '[{"value":7000,"symbol":"USD","isDefault":0},{"value":260000,"symbol":"UAH","isDefault":1}]', 4, '2025-12-04 09:40:00', 'Сидоренко С.', 'готово', '{"start":"2025-12-04","end":"2026-12-04"}'),
('SN-24001', 0, '', 'Монитор Dell UltraSharp 27"', 'Монитор', '2560x1440, IPS', '[{"value":400,"symbol":"USD","isDefault":0},{"value":14800,"symbol":"UAH","isDefault":1}]', 5, '2025-12-05 14:10:00', 'Петренко П.', 'в ремонте', '{"start":"2025-12-05","end":"2026-12-05"}'),
('SN-24002', 0, '', 'Монитор LG 24"', 'Монитор', '1920x1080, IPS', '[{"value":200,"symbol":"USD","isDefault":0},{"value":7400,"symbol":"UAH","isDefault":1}]', 5, '2025-12-05 14:20:00', 'Иванов И.', 'готово', '{"start":"2025-12-05","end":"2026-12-05"}'),
('SN-25001', 0, '', 'Принтер Canon i-Sensys', 'Принтер', 'Лазерный, 18 стр/мин', '[{"value":180,"symbol":"USD","isDefault":0},{"value":6700,"symbol":"UAH","isDefault":1}]', 6, '2025-12-06 13:40:00', 'Сидоренко С.', 'в ремонте', '{"start":"2025-12-06","end":"2026-12-06"}'),
('SN-25002', 1, '', 'Принтер HP DeskJet', 'Принтер', 'Струйный, 10 стр/мин', '[{"value":120,"symbol":"USD","isDefault":0},{"value":4500,"symbol":"UAH","isDefault":1}]', 6, '2025-12-06 13:50:00', 'Иванов И.', 'готово', '{"start":"2025-12-06","end":"2026-12-06"}'),
('SN-25003', 0, '', 'Принтер Epson L3150', 'Принтер', 'Струйный, 15 стр/мин', '[{"value":150,"symbol":"USD","isDefault":0},{"value":5600,"symbol":"UAH","isDefault":1}]', 6, '2025-12-06 14:00:00', 'Петренко П.', 'готово', '{"start":"2025-12-06","end":"2026-12-06"}'),
('SN-26001', 1, '', 'ПК Dell OptiPlex 7080', 'ПК', 'Intel i5, 16ГБ ОЗУ, 512ГБ SSD', '[{"value":1000,"symbol":"USD","isDefault":0},{"value":37000,"symbol":"UAH","isDefault":1}]', 7, '2025-12-07 11:00:00', 'Иванов И.', 'в ремонте', '{"start":"2025-12-07","end":"2026-12-07"}'),
('SN-26002', 1, '', 'ПК HP EliteDesk 800', 'ПК', 'Intel i7, 32ГБ ОЗУ, 1ТБ SSD', '[{"value":1500,"symbol":"USD","isDefault":0},{"value":55500,"symbol":"UAH","isDefault":1}]', 7, '2025-12-07 11:15:00', 'Сидоренко С.', 'готово', '{"start":"2025-12-07","end":"2026-12-07"}'),
('SN-26003', 0, '', 'ПК Lenovo ThinkCentre M720', 'ПК', 'Intel i5, 16ГБ ОЗУ, 256ГБ SSD', '[{"value":900,"symbol":"USD","isDefault":0},{"value":33300,"symbol":"UAH","isDefault":1}]', 7, '2025-12-07 11:30:00', 'Петренко П.', 'готово', '{"start":"2025-12-07","end":"2026-12-07"}'),
('SN-27001', 1, '', 'Ноутбук HP EliteBook 840', 'Ноутбук', 'Intel i5, 8ГБ ОЗУ, 256ГБ SSD', '[{"value":1200,"symbol":"USD","isDefault":0},{"value":45000,"symbol":"UAH","isDefault":1}]', 8, '2025-12-08 09:40:00', 'Иванов И.', 'в ремонте', '{"start":"2025-12-08","end":"2026-12-08"}'),
('SN-27002', 1, '', 'Ноутбук HP ProBook 450', 'Ноутбук', 'Intel i7, 16ГБ ОЗУ, 512ГБ SSD', '[{"value":1400,"symbol":"USD","isDefault":0},{"value":52000,"symbol":"UAH","isDefault":1}]', 8, '2025-12-08 09:50:00', 'Сидоренко С.', 'готово', '{"start":"2025-12-08","end":"2026-12-08"}'),
('SN-28001', 1, '', 'Батарея для iPhone 12', 'Аксессуар', 'Литий-ионный, 2815 мА·ч', '[{"value":50,"symbol":"USD","isDefault":0},{"value":1850,"symbol":"UAH","isDefault":1}]', 9, '2025-12-09 15:10:00', 'Петренко П.', 'в ремонте', '{"start":"2025-12-09","end":"2026-12-09"}'),
('SN-28002', 1, '', 'Батарея для Samsung Galaxy S21', 'Аксессуар', 'Литий-ионный, 4000 мА·ч', '[{"value":60,"symbol":"USD","isDefault":0},{"value":2250,"symbol":"UAH","isDefault":1}]', 9, '2025-12-09 15:20:00', 'Иванов И.', 'готово', '{"start":"2025-12-09","end":"2026-12-09"}'),
('SN-29001', 1, '', 'Маршрутизатор Cisco RV340', 'Сетевое оборудование', 'Dual WAN, 4 порта', '[{"value":150,"symbol":"USD","isDefault":0},{"value":5550,"symbol":"UAH","isDefault":1}]', 10, '2025-12-10 11:30:00', 'Сидоренко С.', 'в ремонте', '{"start":"2025-12-10","end":"2026-12-10"}'),
('SN-29002', 1, '', 'Коммутатор Cisco SG250', 'Сетевое оборудование', '24 порта, Gigabit', '[{"value":200,"symbol":"USD","isDefault":0},{"value":7400,"symbol":"UAH","isDefault":1}]', 10, '2025-12-10 11:40:00', 'Петренко П.', 'готово', '{"start":"2025-12-10","end":"2026-12-10"}'),
('SN-30001', 0, '', 'Проектор Epson EB-X41', 'Проектор', '3600 люмен, XGA', '[{"value":400,"symbol":"USD","isDefault":0},{"value":14800,"symbol":"UAH","isDefault":1}]', 11, '2025-12-11 14:40:00', 'Иванов И.', 'в ремонте', '{"start":"2025-12-11","end":"2026-12-11"}'),
('SN-30002', 0, '', 'Проектор BenQ MW535', 'Проектор', '3600 люмен, WXGA', '[{"value":350,"symbol":"USD","isDefault":0},{"value":12950,"symbol":"UAH","isDefault":1}]', 11, '2025-12-11 14:50:00', 'Сидоренко С.', 'готово', '{"start":"2025-12-11","end":"2026-12-11"}'),
('SN-31001', 1, '', 'Планшет Apple iPad 9', 'Планшет', '64ГБ, Серебристый', '[{"value":400,"symbol":"USD","isDefault":0},{"value":14800,"symbol":"UAH","isDefault":1}]', 12, '2025-12-12 09:50:00', 'Петренко П.', 'в ремонте', '{"start":"2025-12-12","end":"2026-12-12"}'),
('SN-31002', 1, '', 'Планшет Samsung Galaxy Tab S7', 'Планшет', '128ГБ, Черный', '[{"value":600,"symbol":"USD","isDefault":0},{"value":22200,"symbol":"UAH","isDefault":1}]', 12, '2025-12-12 10:00:00', 'Иванов И.', 'готово', '{"start":"2025-12-12","end":"2026-12-12"}'),
('SN-31003', 1, '', 'Планшет Huawei MatePad 11', 'Планшет', '128ГБ, Серый', '[{"value":500,"symbol":"USD","isDefault":0},{"value":18500,"symbol":"UAH","isDefault":1}]', 12, '2025-12-12 10:10:00', 'Сидоренко С.', 'готово', '{"start":"2025-12-12","end":"2026-12-12"}'),
('SN-32001', 0, '', 'Сервер Dell PowerEdge T40', 'Сервер', 'Intel Xeon E-2224G, 16ГБ ОЗУ, 1ТБ HDD', '[{"value":1000,"symbol":"USD","isDefault":0},{"value":37000,"symbol":"UAH","isDefault":1}]', 13, '2025-12-13 10:10:00', 'Иванов И.', 'в ремонте', '{"start":"2025-12-13","end":"2026-12-13"}'),
('SN-32002', 0, '', 'Коммутатор Netgear GS716T', 'Сетевое оборудование', '16 портов, Gigabit', '[{"value":120,"symbol":"USD","isDefault":0},{"value":4440,"symbol":"UAH","isDefault":1}]', 13, '2025-12-13 10:20:00', 'Сидоренко С.', 'готово', '{"start":"2025-12-13","end":"2026-12-13"}'),
('SN-33001', 1, '', 'Принтер Canon PIXMA TS5340', 'Принтер', 'Струйный, 10 стр/мин', '[{"value":100,"symbol":"USD","isDefault":0},{"value":3700,"symbol":"UAH","isDefault":1}]', 14, '2025-12-14 13:10:00', 'Петренко П.', 'в ремонте', '{"start":"2025-12-14","end":"2026-12-14"}'),
('SN-33002', 1, '', 'Сканер Epson Perfection V39', 'Сканер', 'Планшетный, 4800dpi', '[{"value":80,"symbol":"USD","isDefault":0},{"value":2960,"symbol":"UAH","isDefault":1}]', 14, '2025-12-14 13:20:00', 'Иванов И.', 'готово', '{"start":"2025-12-14","end":"2026-12-14"}'),
('SN-34001', 1, '', 'Ноутбук Lenovo ThinkPad X1 Carbon', 'Ноутбук', 'Intel i7, 16ГБ ОЗУ, 512ГБ SSD', '[{"value":1500,"symbol":"USD","isDefault":0},{"value":55500,"symbol":"UAH","isDefault":1}]', 15, '2025-12-15 09:40:00', 'Сидоренко С.', 'в ремонте', '{"start":"2025-12-15","end":"2026-12-15"}');

INSERT INTO settings (`key`, `value`, description) VALUES
('default_currency', 'UAH', 'Валюта по умолчанию');

