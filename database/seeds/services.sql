-- Seed data for services (6 main services)
INSERT INTO services (name, slug, description, short_description, icon, color_primary, color_secondary, is_featured, order_position, active) VALUES
('Software Development', 'software-development', 'Custom software solutions tailored to your business needs. From web applications to mobile apps, we build scalable and robust software.', 'Custom software solutions for web, mobile, and desktop', 'code', '#3B82F6', '#1E40AF', 1, 1, 1),
('SaaS Platforms', 'saas-platforms', 'Build and scale your Software as a Service platform with our expertise in multi-tenant architecture, subscription management, and cloud infrastructure.', 'Scalable SaaS solutions with multi-tenancy', 'cloud', '#10B981', '#059669', 1, 2, 1),
('Enterprise Solutions', 'enterprise-solutions', 'Enterprise-grade solutions for large organizations. ERP, CRM, BI, and custom enterprise systems that drive efficiency.', 'Enterprise systems for large organizations', 'building', '#8B5CF6', '#7C3AED', 1, 3, 1),
('AI & Automation', 'ai-automation', 'Leverage artificial intelligence and automation to transform your business. Chatbots, ML models, NLP, and intelligent process automation.', 'AI-powered solutions and automation', 'cpu', '#F59E0B', '#D97706', 1, 4, 1),
('Modernization', 'modernization', 'Modernize your legacy systems with cloud migration, architecture refactoring, and technology stack upgrades.', 'Legacy system modernization and cloud migration', 'refresh', '#EC4899', '#DB2777', 1, 5, 1),
('UX Engineering', 'ux-engineering', 'Create exceptional user experiences through research, design systems, prototyping, and usability testing.', 'User-centered design and experience engineering', 'eye', '#06B6D4', '#0891B2', 1, 6, 1);

-- Verify services count
SELECT COUNT(*) as total_services FROM services;
