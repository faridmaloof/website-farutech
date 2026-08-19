-- ================================================
-- FaruTech Admin Panel Schema (add-on)
-- Ejecutar DESPUÉS de schema.sql para añadir las
-- tablas del panel de administración / blog.
-- ================================================
USE farutech_db;

-- Admin users (autenticación del panel)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','editor') DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ubicaciones (normalizadas: países → estados/departamentos → ciudades)
CREATE TABLE IF NOT EXISTS countries (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  iso2 VARCHAR(2) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  calling_code VARCHAR(10) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS states (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  country_id INT UNSIGNED NOT NULL,
  name VARCHAR(150) NOT NULL,
  iso_code VARCHAR(10) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_states_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
  INDEX idx_states_country (country_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cities (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  state_id INT UNSIGNED NOT NULL,
  name VARCHAR(150) NOT NULL,
  timezone VARCHAR(80) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cities_state FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE,
  INDEX idx_cities_state (state_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Servicios (categorías) y tipos de aplicación (subcategorías)
CREATE TABLE IF NOT EXISTS services (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS application_types (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id INT UNSIGNED NOT NULL,
  name VARCHAR(160) NOT NULL,
  description TEXT,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_apptypes_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  INDEX idx_apptypes_service (service_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vincular un lead a uno o varios tipos de aplicación
CREATE TABLE IF NOT EXISTS lead_application_types (
  lead_id INT UNSIGNED NOT NULL,
  application_type_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (lead_id, application_type_id),
  CONSTRAINT fk_lat_lead FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  CONSTRAINT fk_lat_app FOREIGN KEY (application_type_id) REFERENCES application_types(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Información de contacto (una sola fila, editable desde el panel)
CREATE TABLE IF NOT EXISTS contact_info (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(50) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  address VARCHAR(255) DEFAULT NULL,
  social_links JSON DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blog: categorías y posts
CREATE TABLE IF NOT EXISTS blog_categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content_html LONGTEXT,
  meta_title VARCHAR(255) DEFAULT NULL,
  meta_description VARCHAR(500) DEFAULT NULL,
  meta_keywords VARCHAR(500) DEFAULT NULL,
  featured_image VARCHAR(255) DEFAULT NULL,
  category_id INT UNSIGNED DEFAULT NULL,
  status ENUM('draft','published') DEFAULT 'draft',
  admin_user_id INT UNSIGNED DEFAULT NULL,
  published_at DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_blog_category FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE SET NULL,
  CONSTRAINT fk_blog_author FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE SET NULL,
  INDEX idx_blog_status (status),
  INDEX idx_blog_published (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Usuario admin por defecto (password: "Admin123!")
INSERT INTO admin_users (name, email, username, password_hash, role)
SELECT 'Administrador', 'admin@farutech.com', 'admin', '$2y$10$6HfB/0qKToVbMx9quXG1w.sEeDrqG3CwC0YgLxqDG8zG5lDvBXZ7W', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE username = 'admin');

-- Servicios por defecto (categorías)
INSERT INTO services (slug, name, description, is_active) VALUES
  ('desarrollo-software', 'Desarrollo de Software a Medida', 'Aplicaciones web, APIs e integraciones a medida.', 1),
  ('plataformas-saas', 'Plataformas SaaS y Multi-Tenant', 'Productos multiinquilino con aislamiento por organización.', 1),
  ('soluciones-empresariales', 'Soluciones Empresariales', 'Integración de sistemas y operación conectada.', 1),
  ('ia-automatizacion', 'IA y Automatización', 'Automatización de procesos con IA aplicada.', 1),
  ('modernizacion', 'Modernización Tecnológica', 'Migración de sistemas legacy a arquitectura moderna.', 1),
  ('ux-engineering', 'UX Engineering', 'Design systems, accesibilidad y performance.', 1)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Información de contacto por defecto
INSERT INTO contact_info (phone, email, address)
SELECT '+57 (1) 000 0000', 'contacto@farutech.com', 'Bogotá · Cali · Remoto'
WHERE NOT EXISTS (SELECT 1 FROM contact_info LIMIT 1);

-- Categorías de blog por defecto
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Ingeniería', 'ingenieria', 'Desarrollo, arquitectura y buenas prácticas.'),
  ('Producto', 'producto', 'SaaS, multi-tenant y ciclo de vida del producto.'),
  ('Diseño y UX', 'diseno-ux', 'Accesibilidad, design systems y experiencia.'),
  ('Negocio', 'negocio', 'Automatización, modernización y estrategia.')
ON DUPLICATE KEY UPDATE name = VALUES(name);

