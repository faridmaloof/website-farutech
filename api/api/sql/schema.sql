-- FaruTech API — esquema de base de datos (MySQL / MariaDB, compatible Hostinger)

CREATE TABLE IF NOT EXISTS contacts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL,
    message TEXT NOT NULL,
    service_interest VARCHAR(80) NULL,
    ip_address VARCHAR(45) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_contacts_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS subscribers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(180) NOT NULL UNIQUE,
    status ENUM('pending', 'confirmed', 'unsubscribed') NOT NULL DEFAULT 'pending',
    token VARCHAR(64) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    confirmed_at DATETIME NULL,
    INDEX idx_subscribers_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
