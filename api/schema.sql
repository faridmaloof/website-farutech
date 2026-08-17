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
