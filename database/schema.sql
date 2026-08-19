-- ================================================
-- FaruTech Database Schema
-- ================================================
-- MySQL Database for Lead Management and Newsletter
-- Compatible with MySQL 5.7+ and MariaDB 10.2+
-- ================================================

-- Create database
CREATE DATABASE IF NOT EXISTS farutech_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE farutech_db;

-- ================================================
-- Table: leads
-- Stores contact form submissions with lead scoring
-- ================================================
CREATE TABLE IF NOT EXISTS leads (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- Contact Information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    company VARCHAR(255) DEFAULT NULL,
    position VARCHAR(150) DEFAULT NULL,
    
    -- Project Details
    service_interest ENUM(
        'desarrollo-software',
        'plataformas-saas',
        'soluciones-empresariales',
        'ia-automatizacion',
        'ux-engineering',
        'otro'
    ) NOT NULL,
    
    budget_range ENUM(
        'less_than_1000',
        '1000-2500',
        '2500-5000',
        '5000-10000',
        '10000+'
    ) DEFAULT NULL,
    
    project_timeline ENUM(
        'immediate',
        '1-3_months',
        '3-6_months',
        '6+_months',
        'just_exploring'
    ) DEFAULT NULL,
    
    message TEXT NOT NULL,
    
    -- Lead Scoring
    lead_score TINYINT UNSIGNED DEFAULT 0,
    lead_quality ENUM('unqualified', 'cold', 'warm', 'hot') DEFAULT 'unqualified',
    
    -- Metadata
    source VARCHAR(100) DEFAULT 'website',
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Status tracking
    status ENUM('new', 'contacted', 'qualified', 'converted', 'lost') DEFAULT 'new',
    notes TEXT DEFAULT NULL,
    
    -- Indexes for performance
    INDEX idx_email (email),
    INDEX idx_service_interest (service_interest),
    INDEX idx_lead_quality (lead_quality),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_lead_score (lead_score),
    
    -- Unique constraint to prevent duplicate emails within 24 hours
    UNIQUE KEY unique_email_time (email, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: newsletter_subscribers
-- Stores newsletter subscription information
-- ================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    email VARCHAR(255) NOT NULL,
    source VARCHAR(100) DEFAULT 'website',
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_confirmed BOOLEAN DEFAULT FALSE,
    confirmation_token VARCHAR(64) DEFAULT NULL,
    
    -- Timestamps
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP NULL DEFAULT NULL,
    unsubscribed_at TIMESTAMP NULL DEFAULT NULL,
    
    -- Metadata
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    
    -- Indexes
    UNIQUE KEY unique_email (email),
    INDEX idx_is_active (is_active),
    INDEX idx_subscribed_at (subscribed_at),
    INDEX idx_source (source)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: lead_activity_log
-- Tracks all interactions with leads for auditing
-- ================================================
CREATE TABLE IF NOT EXISTS lead_activity_log (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    lead_id INT UNSIGNED NOT NULL,
    activity_type ENUM(
        'created',
        'viewed',
        'contacted',
        'updated',
        'qualified',
        'converted',
        'lost',
        'email_sent',
        'email_opened',
        'email_clicked',
        'call_made',
        'meeting_scheduled',
        'proposal_sent',
        'note_added'
    ) NOT NULL,
    
    description TEXT DEFAULT NULL,
    metadata JSON DEFAULT NULL,
    performed_by VARCHAR(100) DEFAULT 'system',
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key
    CONSTRAINT fk_lead_activity_lead 
        FOREIGN KEY (lead_id) REFERENCES leads(id) 
        ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_lead_id (lead_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_performed_at (performed_at)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: api_access_log
-- Logs all API requests for security and analytics
-- ================================================
CREATE TABLE IF NOT EXISTS api_access_log (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    endpoint VARCHAR(255) NOT NULL,
    method ENUM('GET', 'POST', 'PUT', 'DELETE', 'OPTIONS') NOT NULL,
    
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    request_data JSON DEFAULT NULL,
    response_status SMALLINT UNSIGNED DEFAULT NULL,
    response_time_ms INT UNSIGNED DEFAULT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    INDEX idx_endpoint (endpoint),
    INDEX idx_method (method),
    INDEX idx_created_at (created_at),
    INDEX idx_response_status (response_status)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Trigger: Auto-calculate lead score on insert
-- ================================================
DELIMITER $$

CREATE TRIGGER IF NOT EXISTS before_lead_insert
BEFORE INSERT ON leads
FOR EACH ROW
BEGIN
    DECLARE score INT DEFAULT 0;
    
    -- Base score for required fields
    SET score = 40;
    
    -- Phone provided (+10)
    IF NEW.phone IS NOT NULL AND NEW.phone != '' THEN
        SET score = score + 10;
    END IF;
    
    -- Company provided (+10)
    IF NEW.company IS NOT NULL AND NEW.company != '' THEN
        SET score = score + 10;
    END IF;
    
    -- Position provided (+5)
    IF NEW.position IS NOT NULL AND NEW.position != '' THEN
        SET score = score + 5;
    END IF;
    
    -- Budget range provided (+15 to +25)
    IF NEW.budget_range IS NOT NULL THEN
        SET score = score + 15;
        
        IF NEW.budget_range IN ('5000-10000', '10000+') THEN
            SET score = score + 10;
        END IF;
    END IF;
    
    -- Timeline provided (+10 to +20)
    IF NEW.project_timeline IS NOT NULL THEN
        SET score = score + 10;
        
        IF NEW.project_timeline = 'immediate' THEN
            SET score = score + 10;
        ELSEIF NEW.project_timeline = '1-3_months' THEN
            SET score = score + 5;
        END IF;
    END IF;
    
    -- Message length bonus (max +10)
    IF CHAR_LENGTH(NEW.message) > 200 THEN
        SET score = score + 10;
    ELSEIF CHAR_LENGTH(NEW.message) > 100 THEN
        SET score = score + 5;
    END IF;
    
    -- Cap at 100
    IF score > 100 THEN
        SET score = 100;
    END IF;
    
    SET NEW.lead_score = score;
    
    -- Determine quality
    IF score >= 80 THEN
        SET NEW.lead_quality = 'hot';
    ELSEIF score >= 60 THEN
        SET NEW.lead_quality = 'warm';
    ELSEIF score >= 40 THEN
        SET NEW.lead_quality = 'cold';
    ELSE
        SET NEW.lead_quality = 'unqualified';
    END IF;
END$$

DELIMITER ;

-- ================================================
-- Trigger: Log lead creation
-- ================================================
DELIMITER $$

CREATE TRIGGER IF NOT EXISTS after_lead_insert
AFTER INSERT ON leads
FOR EACH ROW
BEGIN
    INSERT INTO lead_activity_log (lead_id, activity_type, description, performed_by)
    VALUES (NEW.id, 'created', CONCAT('Lead created from source: ', NEW.source), 'system');
END$$

DELIMITER ;

-- ================================================
-- Stored Procedure: Get leads by quality
-- ================================================
DELIMITER $$

CREATE PROCEDURE IF NOT EXISTS GetLeadsByQuality(
    IN p_quality VARCHAR(20),
    IN p_limit INT
)
BEGIN
    SELECT 
        id,
        name,
        email,
        phone,
        company,
        position,
        service_interest,
        budget_range,
        project_timeline,
        lead_score,
        lead_quality,
        status,
        created_at
    FROM leads
    WHERE lead_quality = p_quality
      AND status = 'new'
    ORDER BY created_at DESC
    LIMIT p_limit;
END$$

DELIMITER ;

-- ================================================
-- Stored Procedure: Get dashboard statistics
-- ================================================
DELIMITER $$

CREATE PROCEDURE IF NOT EXISTS GetDashboardStats()
BEGIN
    -- Total leads today
    SELECT COUNT(*) as leads_today 
    FROM leads 
    WHERE DATE(created_at) = CURDATE();
    
    -- Total leads this week
    SELECT COUNT(*) as leads_this_week 
    FROM leads 
    WHERE YEARWEEK(created_at) = YEARWEEK(NOW());
    
    -- Total leads this month
    SELECT COUNT(*) as leads_this_month 
    FROM leads 
    WHERE MONTH(created_at) = MONTH(NOW()) 
      AND YEAR(created_at) = YEAR(NOW());
    
    -- Leads by quality
    SELECT 
        lead_quality,
        COUNT(*) as count
    FROM leads
    WHERE MONTH(created_at) = MONTH(NOW())
    GROUP BY lead_quality;
    
    -- Leads by service interest
    SELECT 
        service_interest,
        COUNT(*) as count
    FROM leads
    WHERE MONTH(created_at) = MONTH(NOW())
    GROUP BY service_interest;
    
    -- Conversion rate
    SELECT 
        COUNT(CASE WHEN status = 'converted' THEN 1 END) * 100.0 / COUNT(*) as conversion_rate
    FROM leads
    WHERE MONTH(created_at) = MONTH(NOW);
    
    -- Active subscribers
    SELECT COUNT(*) as active_subscribers 
    FROM newsletter_subscribers 
    WHERE is_active = TRUE;
END$$

DELIMITER ;

-- ================================================
-- Sample Data (Optional - Remove in production)
-- ================================================
-- Uncomment to insert sample data for testing
-- 
-- INSERT INTO leads (name, email, phone, company, position, service_interest, budget_range, project_timeline, message, source)
-- VALUES 
-- ('Juan Pérez', 'juan@afilamoshermanos.com', '+57 300 123 4567', 'Afilamos Hermanos', 'CEO', 'desarrollo-software', '5000-10000', 'immediate', 'Necesitamos un sistema POS integrado con gestión de órdenes.', 'website'),
-- ('María Rodríguez', 'maria@supraeventos.com', '+57 310 987 6543', 'Supraeventos', 'CTO', 'plataformas-saas', '10000+', '1-3_months', 'Requerimos infraestructura cloud segura y escalable.', 'website');

-- ================================================
-- End of Schema
-- ================================================
