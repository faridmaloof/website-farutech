-- ================================================
-- FaruTech Admin Panel - Application Types Seed
-- Inserta los 105 tipos de aplicación organizados por servicio
-- Ejecutar DESPUÉS de schema_admin.sql
-- ================================================
USE farutech_db;

-- ============================================
-- SOFTWARE DEVELOPMENT (25 tipos) - service_id = 1
-- ============================================

-- Sistemas de Punto de Venta (POS)
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(1, 'POS para Veterinarias', 'Sistema de punto de venta especializado para clínicas veterinarias', 1),
(1, 'POS para Restaurantes', 'Sistema de gestión de pedidos y mesas para restaurantes', 1),
(1, 'POS para Retail/Tiendas', 'Sistema de ventas para tiendas minoristas', 1),
(1, 'POS para Farmacias', 'Sistema de punto de venta con gestión de medicamentos', 1),
(1, 'POS para Supermercados', 'Sistema de ventas de alto volumen para supermercados', 1);

-- E-commerce
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(1, 'E-commerce B2B', 'Plataforma de comercio electrónico Business to Business', 1),
(1, 'E-commerce B2C', 'Plataforma de comercio electrónico Business to Consumer', 1),
(1, 'Marketplace Multi-vendedor', 'Plataforma de múltiples vendedores con comisiones', 1),
(1, 'Tienda Online con Suscripciones', 'E-commerce con modelo de suscripción recurrente', 1),
(1, 'E-commerce para Dropshipping', 'Plataforma de ventas sin inventario propio', 1);

-- Sistemas de Gestión (ERP/CRM)
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(1, 'CRM para PyMEs', 'Sistema de gestión de relaciones con clientes para pequeñas empresas', 1),
(1, 'ERP de Manufactura', 'Sistema de planificación de recursos empresariales para manufactura', 1),
(1, 'Sistema de Gestión de Inventarios', 'Control de stock y almacenes en tiempo real', 1),
(1, 'Sistema de Facturación Electrónica', 'Emisión de facturas electrónicas según normativa', 1),
(1, 'Sistema de Contabilidad en la Nube', 'Plataforma contable accesible desde cualquier lugar', 1);

-- Salud (Healthtech)
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(1, 'Historia Clínica Electrónica', 'Registro digital de pacientes con acceso seguro', 1),
(1, 'Sistema de Telemedicina', 'Plataforma de consultas médicas remotas', 1),
(1, 'Agenda Médica Online', 'Sistema de reservas de citas para profesionales de salud', 1),
(1, 'Sistema de Gestión Hospitalaria', 'Administración integral de hospitales y clínicas', 1),
(1, 'App de Citas para Consultorios', 'Aplicación móvil para agendamiento de citas médicas', 1);

-- Educación (Edtech)
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(1, 'Plataforma LMS', 'Learning Management System para educación online', 1),
(1, 'Sistema de Gestión Escolar', 'Administración académica y administrativa de instituciones', 1),
(1, 'Plataforma de Cursos Online', 'Sistema de distribución y venta de cursos digitales', 1),
(1, 'App de Tareas y Calificaciones', 'Aplicación para seguimiento académico de estudiantes', 1),
(1, 'Sistema de Admisiones Universitarias', 'Plataforma de gestión de procesos de admisión', 1);

-- ============================================
-- SAAS PLATFORMS (20 tipos) - service_id = 2
-- ============================================

-- Gestión Empresarial
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(2, 'SaaS de Gestión de Proyectos', 'Plataforma multi-tenant para gestión ágil de proyectos', 1),
(2, 'SaaS de Recursos Humanos (HCM)', 'Sistema de gestión de capital humano en la nube', 1),
(2, 'SaaS de Nómina Electrónica', 'Procesamiento de nóminas con cumplimiento normativo', 1),
(2, 'SaaS de Control de Asistencia', 'Registro de jornada laboral con biometría o geolocalización', 1),
(2, 'SaaS de Evaluación de Desempeño', 'Plataforma de evaluación continua de empleados', 1);

-- Ventas y Marketing
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(2, 'SaaS de Automatización de Marketing', 'Plataforma de campañas multicanal automatizadas', 1),
(2, 'SaaS de Email Marketing', 'Envío masivo de correos con segmentación y analytics', 1),
(2, 'SaaS de Gestión de Leads', 'Captura, seguimiento y nurturing de prospectos', 1),
(2, 'SaaS de Embudos de Venta', 'Optimización de conversión con funnels visuales', 1),
(2, 'SaaS de Análisis de Clientes', 'Business Intelligence enfocado en comportamiento de clientes', 1);

-- Operaciones
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(2, 'SaaS de Gestión de Flotas', 'Monitoreo y optimización de vehículos empresariales', 1),
(2, 'SaaS de Logística y Envíos', 'Coordinación de entregas y última milla', 1),
(2, 'SaaS de Control de Almacenes (WMS)', 'Gestión inteligente de centros de distribución', 1),
(2, 'SaaS de Compras y Aprovisionamiento', 'Automatización de procesos de compra empresarial', 1),
(2, 'SaaS de Gestión de Activos', 'Inventario y mantenimiento de activos fijos', 1);

-- Finanzas
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(2, 'SaaS de Facturación Recurrente', 'Cobros automáticos para modelos de suscripción', 1),
(2, 'SaaS de Conciliación Bancaria', 'Comparación automática de transacciones bancarias', 1),
(2, 'SaaS de Presupuesto Empresarial', 'Planificación financiera y control de gastos', 1),
(2, 'SaaS de Reportes Financieros', 'Generación de estados financieros en tiempo real', 1),
(2, 'SaaS de Auditoría Interna', 'Herramientas de compliance y control interno', 1);

-- ============================================
-- ENTERPRISE SOLUTIONS (15 tipos) - service_id = 3
-- ============================================

-- Integración de Sistemas
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(3, 'Sistema de Integración API Gateway', 'Gestión centralizada de APIs empresariales', 1),
(3, 'Middleware de Integración Empresarial', 'Conexión entre sistemas heterogéneos', 1),
(3, 'Sistema de Sincronización de Datos', 'Replicación bidireccional entre bases de datos', 1),
(3, 'Plataforma de Orquestación de Servicios', 'Coordinación de microservicios distribuidos', 1),
(3, 'Sistema de ETL', 'Extracción, transformación y carga de datos masivos', 1);

-- Infraestructura
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(3, 'Sistema de Monitoreo de Servidores', 'Vigilancia de infraestructura crítica 24/7', 1),
(3, 'Plataforma de Gestión de Cloud Híbrido', 'Administración unificada de cloud público y privado', 1),
(3, 'Sistema de Backup Automatizado', 'Copias de seguridad programadas y verificadas', 1),
(3, 'Plataforma de Continuidad de Negocio', 'Planificación de operaciones en contingencias', 1),
(3, 'Sistema de Disaster Recovery', 'Recuperación ante desastres con RTO/RPO definidos', 1);

-- Seguridad Empresarial
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(3, 'Sistema de Gestión de Identidades (IAM)', 'Control de accesos y autenticación centralizada', 1),
(3, 'Plataforma de Seguridad Perimetral', 'Protección de red contra amenazas externas', 1),
(3, 'Sistema de Detección de Intrusos', 'Monitoreo proactivo de actividades sospechosas', 1),
(3, 'Plataforma de Compliance Normativo', 'Cumplimiento de regulaciones industriales', 1),
(3, 'Sistema de Auditoría de Seguridad', 'Evaluación periódica de postura de seguridad', 1);

-- ============================================
-- AI & AUTOMATION (20 tipos) - service_id = 4
-- ============================================

-- Automatización de Procesos (RPA)
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(4, 'Bot de Automatización de Facturas', 'Procesamiento automático de facturas de proveedores', 1),
(4, 'Sistema de Procesamiento de Órdenes', 'Flujo automatizado de órdenes de compra/venta', 1),
(4, 'Bot de Clasificación de Documentos', 'Organización inteligente de archivos digitales', 1),
(4, 'Sistema de Extracción de Datos (OCR)', 'Reconocimiento óptico de caracteres para digitalización', 1),
(4, 'Automatización de Respuestas a Clientes', 'Respuestas automáticas a consultas frecuentes', 1);

-- Inteligencia Artificial Aplicada
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(4, 'Chatbot con IA Conversacional', 'Asistente virtual con procesamiento de lenguaje natural', 1),
(4, 'Sistema de Recomendación de Productos', 'Motor de sugerencias personalizadas basado en comportamiento', 1),
(4, 'Motor de Predicción de Ventas', 'Pronóstico de demanda usando machine learning', 1),
(4, 'Sistema de Detección de Fraudes', 'Identificación de transacciones sospechosas en tiempo real', 1),
(4, 'Análisis de Sentimiento en Redes Sociales', 'Monitoreo de opinión pública sobre marca/productos', 1);

-- Machine Learning
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(4, 'Modelo Predictivo de Churn', 'Predicción de abandono de clientes', 1),
(4, 'Sistema de Clasificación Automática', 'Categorización de elementos usando redes neuronales', 1),
(4, 'Motor de Personalización de Contenido', 'Adaptación dinámica de contenido por usuario', 1),
(4, 'Sistema de Visión Computarizada', 'Análisis de imágenes y video con deep learning', 1),
(4, 'Plataforma de Entrenamiento de Modelos', 'Infraestructura para desarrollo de modelos ML', 1);

-- Procesamiento de Lenguaje Natural
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(4, 'Traductor Automático Especializado', 'Traducción de textos técnicos o industriales', 1),
(4, 'Resumen Automático de Documentos', 'Generación de abstracts de textos extensos', 1),
(4, 'Sistema de Búsqueda Semántica', 'Búsqueda por significado en lugar de palabras clave', 1),
(4, 'Generador de Contenido con IA', 'Creación asistida de textos marketing/técnicos', 1),
(4, 'Analizador de Contratos Legales', 'Extracción de cláusulas y términos contractuales', 1);

-- ============================================
-- MODERNIZATION (10 tipos) - service_id = 5
-- ============================================

-- Migración de Legacy
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(5, 'Migración de Mainframe a Cloud', 'Modernización de sistemas mainframe a arquitectura cloud', 1),
(5, 'Modernización de Desktop a Web', 'Transformación de aplicaciones desktop a web apps', 1),
(5, 'Migración de SQL a NoSQL', 'Transición de bases de datos relacionales a no relacionales', 1),
(5, 'Refactorización de Monolito a Microservicios', 'Descomposición de monolitos en servicios independientes', 1),
(5, 'Actualización de Framework Obsoleto', 'Migración de frameworks legacy a tecnologías modernas', 1);

-- Optimización de Performance
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(5, 'Sistema de Caché Distribuido', 'Mejora de performance con caching en memoria', 1),
(5, 'Plataforma de CDN Propio', 'Red de distribución de contenido personalizada', 1),
(5, 'Optimizador de Queries de Base de Datos', 'Mejora de performance de consultas SQL', 1),
(5, 'Sistema de Balanceo de Carga Inteligente', 'Distribución óptima de tráfico entre servidores', 1),
(5, 'Plataforma de APM', 'Application Performance Monitoring en tiempo real', 1);

-- ============================================
-- UX ENGINEERING (10 tipos) - service_id = 6
-- ============================================

-- Design Systems
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(6, 'Sistema de Diseño Corporativo', 'Guías y componentes de diseño unificados', 1),
(6, 'Biblioteca de Componentes UI', 'Colección reutilizable de elementos de interfaz', 1),
(6, 'Guía de Estilos Interactiva', 'Documentación viva de estándares de diseño', 1),
(6, 'Sistema de Iconografía Personalizada', 'Set de íconos personalizados para marca', 1),
(6, 'Plataforma de Tokens de Diseño', 'Variables de diseño centralizadas y escalables', 1);

-- Accesibilidad
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(6, 'Auditoría de Accesibilidad WCAG', 'Evaluación de cumplimiento de estándares WCAG', 1),
(6, 'Sistema de Lectores de Pantalla', 'Compatibilidad con tecnologías asistivas', 1),
(6, 'Plataforma de Contraste y Color', 'Herramientas de verificación de contraste cromático', 1),
(6, 'Herramienta de Navegación por Teclado', 'Accesibilidad para usuarios sin mouse', 1),
(6, 'Validador de Accesibilidad Automática', 'Testing automatizado de accesibilidad web', 1);

-- Investigación de Usuarios
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(6, 'Plataforma de Testing de Usabilidad', 'Evaluación de experiencia de usuario con testers reales', 1),
(6, 'Sistema de Heatmaps y Grabaciones', 'Visualización de interacciones de usuarios', 1),
(6, 'Herramienta de Encuestas NPS', 'Medición de satisfacción y lealtad de clientes', 1),
(6, 'Plataforma de User Journey Mapping', 'Mapeo visual de experiencias de usuario', 1),
(6, 'Sistema de Análisis de Comportamiento', 'Tracking y análisis de patrones de uso', 1);

-- ============================================
-- Verificación de inserción
-- ============================================
SELECT 
  s.name AS servicio,
  COUNT(at.id) AS tipos_aplicacion
FROM services s
LEFT JOIN application_types at ON s.id = at.service_id
GROUP BY s.id, s.name
ORDER BY s.id;

-- Total esperado: 105 tipos de aplicación
SELECT COUNT(*) AS total_tipos_aplicacion FROM application_types;
