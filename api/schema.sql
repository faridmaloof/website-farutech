CREATE TABLE IF NOT EXISTS contact_leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  company VARCHAR(160) NOT NULL DEFAULT '',
  project_type VARCHAR(80) NOT NULL DEFAULT '',
  timeline VARCHAR(80) NOT NULL DEFAULT '',
  budget VARCHAR(80) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  source_ip VARCHAR(45) NOT NULL DEFAULT '',
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY contact_leads_created_at (created_at),
  KEY contact_leads_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, email VARCHAR(254) NOT NULL, status ENUM('subscribed','unsubscribed') NOT NULL DEFAULT 'subscribed', consented_at DATETIME NOT NULL, source_ip VARCHAR(45) NOT NULL DEFAULT '', created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY (id), UNIQUE KEY newsletter_subscribers_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, slug VARCHAR(140) NOT NULL, title VARCHAR(180) NOT NULL, excerpt VARCHAR(320) NOT NULL, content MEDIUMTEXT NOT NULL, seo_title VARCHAR(180) NOT NULL DEFAULT '', seo_description VARCHAR(320) NOT NULL DEFAULT '', featured_image VARCHAR(255) NOT NULL DEFAULT '', featured_image_alt VARCHAR(180) NOT NULL DEFAULT '', status ENUM('draft','scheduled','published','archived') NOT NULL DEFAULT 'draft', is_active TINYINT(1) NOT NULL DEFAULT 1, published_at DATETIME NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY (id), UNIQUE KEY posts_slug (slug), KEY posts_visibility (is_active, status, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
