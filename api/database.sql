-- ============================================
-- Script SQL para FaruTech Lead Management
-- ============================================
-- Este script crea las tablas necesarias para:
-- 1. Almacenar leads de contacto cualificados
-- 2. Gestionar suscripciones al newsletter
-- ============================================

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS farutech_leads 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE farutech_leads;

-- ============================================
-- Tabla: contact_leads
-- Almacena leads del formulario de contacto
-- ============================================
CREATE TABLE IF NOT EXISTS contact_leads (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- Información básica (requerida)
    name VARCHAR(255) NOT NULL COMMENT 'Nombre completo del contacto',
    email VARCHAR(255) NOT NULL COMMENT 'Email válido',
    
    -- Información adicional (opcional pero valiosa)
    phone VARCHAR(50) DEFAULT NULL COMMENT 'Teléfono con formato internacional',
    company VARCHAR(255) DEFAULT NULL COMMENT 'Nombre de la empresa',
    
    -- Cualificación del lead (CRÍTICO para valor)
    service ENUM(
        'desarrollo-software',
        'plataformas-saas',
        'soluciones-empresariales',
        'ia-automatizacion',
        'ux-engineering',
        'otro'
    ) NOT NULL COMMENT 'Servicio de interés',
    
    budget ENUM(
        '<5M',
        '5M-10M',
        '10M-20M',
        '20M-50M',
        '>50M'
    ) NOT NULL COMMENT 'Presupuesto estimado en millones COP',
    
    timeline ENUM(
        'inmediato',
        '1-3 meses',
        '3-6 meses',
        '6+ meses'
    ) NOT NULL COMMENT 'Timeline del proyecto',
    
    -- Mensaje y contexto
    message TEXT NOT NULL COMMENT 'Descripción detallada del proyecto',
    
    -- Metadatos para tracking
    source VARCHAR(100) DEFAULT 'website' COMMENT 'Fuente del lead (website, referral, etc)',
    utm_source VARCHAR(100) DEFAULT NULL COMMENT 'UTM Source',
    utm_medium VARCHAR(100) DEFAULT NULL COMMENT 'UTM Medium',
    utm_campaign VARCHAR(100) DEFAULT NULL COMMENT 'UTM Campaign',
    
    -- Preferencias
    newsletter TINYINT(1) DEFAULT 0 COMMENT 'Suscribirse al newsletter',
    
    -- Estado del lead (para seguimiento)
    status ENUM(
        'new',
        'contacted',
        'qualified',
        'proposal',
        'negotiation',
        'won',
        'lost',
        'archived'
    ) DEFAULT 'new' COMMENT 'Estado en el funnel de ventas',
    
    -- Score de lead (calculado automáticamente)
    lead_score INT DEFAULT 0 COMMENT 'Score calculado basado en budget, timeline, service',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices para búsquedas rápidas
    INDEX idx_email (email),
    INDEX idx_service (service),
    INDEX idx_budget (budget),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_lead_score (lead_score)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Leads cualificados del formulario de contacto';

-- ============================================
-- Tabla: newsletter_subscribers
-- Almacena suscriptores del newsletter
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- Información esencial
    email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Email único',
    
    -- Preferencias
    source VARCHAR(100) DEFAULT 'website' COMMENT 'Fuente de suscripción',
    interests JSON DEFAULT NULL COMMENT 'Intereses del suscriptor (array JSON)',
    
    -- Estado
    status ENUM('active', 'unsubscribed', 'bounced') DEFAULT 'active' COMMENT 'Estado de suscripción',
    
    -- Engagement tracking
    opens_count INT DEFAULT 0 COMMENT 'Número de emails abiertos',
    clicks_count INT DEFAULT 0 COMMENT 'Número de clicks en emails',
    last_engagement_at TIMESTAMP NULL DEFAULT NULL COMMENT 'Última interacción',
    
    -- Timestamps
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_subscribed_at (subscribed_at)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Suscriptores del newsletter';

-- ============================================
-- Tabla: contact_interactions
-- Historial de interacciones con cada lead
-- ============================================
CREATE TABLE IF NOT EXISTS contact_interactions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    lead_id INT UNSIGNED NOT NULL COMMENT 'Referencia al lead',
    
    -- Tipo de interacción
    type ENUM(
        'email_sent',
        'email_opened',
        'email_clicked',
        'call_made',
        'meeting_scheduled',
        'proposal_sent',
        'follow_up',
        'note'
    ) NOT NULL COMMENT 'Tipo de interacción',
    
    -- Detalles
    subject VARCHAR(255) DEFAULT NULL COMMENT 'Asunto (para emails)',
    notes TEXT DEFAULT NULL COMMENT 'Notas de la interacción',
    
    -- Metadata
    performed_by VARCHAR(100) DEFAULT 'system' COMMENT 'Quién realizó la interacción',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key
    FOREIGN KEY (lead_id) REFERENCES contact_leads(id) ON DELETE CASCADE,
    
    -- Índices
    INDEX idx_lead_id (lead_id),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Historial de interacciones con leads';

-- ============================================
-- Trigger: Calcular lead_score automáticamente
-- ============================================
DELIMITER $$

CREATE TRIGGER IF NOT EXISTS calculate_lead_score 
BEFORE INSERT ON contact_leads
FOR EACH ROW
BEGIN
    DECLARE score INT DEFAULT 0;
    
    -- Score por presupuesto (0-50 puntos)
    CASE NEW.budget
        WHEN '>50M' THEN SET score = score + 50;
        WHEN '20M-50M' THEN SET score = score + 40;
        WHEN '10M-20M' THEN SET score = score + 30;
        WHEN '5M-10M' THEN SET score = score + 20;
        WHEN '<5M' THEN SET score = score + 10;
    END CASE;
    
    -- Score por timeline (0-30 puntos)
    CASE NEW.timeline
        WHEN 'inmediato' THEN SET score = score + 30;
        WHEN '1-3 meses' THEN SET score = score + 25;
        WHEN '3-6 meses' THEN SET score = score + 15;
        WHEN '6+ meses' THEN SET score = score + 5;
    END CASE;
    
    -- Score por servicio (0-20 puntos)
    CASE NEW.service
        WHEN 'plataformas-saas' THEN SET score = score + 20;
        WHEN 'soluciones-empresariales' THEN SET score = score + 18;
        WHEN 'ia-automatizacion' THEN SET score = score + 18;
        WHEN 'desarrollo-software' THEN SET score = score + 15;
        WHEN 'ux-engineering' THEN SET score = score + 12;
        WHEN 'otro' THEN SET score = score + 5;
    END CASE;
    
    SET NEW.lead_score = score;
END$$

DELIMITER ;

-- ============================================
-- Vista: Leads calientes (hot leads)
-- ============================================
CREATE OR REPLACE VIEW hot_leads AS
SELECT 
    id,
    name,
    email,
    company,
    service,
    budget,
    timeline,
    lead_score,
    status,
    created_at
FROM contact_leads
WHERE lead_score >= 70 
  AND status IN ('new', 'contacted', 'qualified')
ORDER BY lead_score DESC, created_at DESC;

-- ============================================
-- Datos iniciales de ejemplo (opcional)
-- ============================================
-- INSERT INTO contact_leads (name, email, phone, company, service, budget, timeline, message) VALUES
-- ('Juan Pérez', 'juan@empresa.com', '+57 300 123 4567', 'Empresa SAS', 'desarrollo-software', '10M-20M', '1-3 meses', 'Necesitamos desarrollar una plataforma SaaS...'),
-- ('María García', 'maria@startup.co', '+57 310 987 6543', 'Startup Co', 'plataformas-saas', '20M-50M', 'inmediato', 'Buscamos partner técnico para nuestro MVP...');

-- ============================================
-- Usuario para la aplicación (recomendado)
-- ============================================
-- CREATE USER IF NOT EXISTS 'farutech_app'@'localhost' IDENTIFIED BY 'password_seguro_aqui';
-- GRANT SELECT, INSERT, UPDATE ON farutech_leads.contact_leads TO 'farutech_app'@'localhost';
-- GRANT SELECT, INSERT, UPDATE ON farutech_leads.newsletter_subscribers TO 'farutech_app'@'localhost';
-- GRANT SELECT, INSERT ON farutech_leads.contact_interactions TO 'farutech_app'@'localhost';
-- FLUSH PRIVILEGES;

-- ============================================
-- Fin del script
-- ============================================
