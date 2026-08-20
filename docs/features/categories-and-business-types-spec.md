# Especificación Detallada - Categorías y Tipos de Negocio

## Contexto

Este documento complementa el plan principal `admin-panel-and-cms-implementation.md` especificando cómo se deben estructurar las categorías y subcategorías para tipificar el tipo de negocio/cliente que FaruTech puede atender.

---

## Definición Conceptual

### Categoría = Servicio Principal
Cada categoría representa uno de los **6 servicios core** de FaruTech:

1. **Software Development** (Desarrollo de Software a Medida)
2. **SaaS Platforms** (Plataformas SaaS y Multi-Tenant)
3. **Enterprise Solutions** (Soluciones Empresariales)
4. **AI & Automation** (IA y Automatización)
5. **Modernization** (Modernización Tecnológica)
6. **UX Engineering** (Ingeniería de Experiencia de Usuario)

### Subcategoría = Tipo de Aplicación/Negocio
Cada subcategoría representa un **tipo específico de aplicación o sistema** que clasifica el tipo de negocio o cliente objetivo.

**Ejemplo:**
- **Categoría:** Software Development
- **Subcategorías:** 
  - Sistema POS para Veterinarias
  - E-commerce B2B
  - CRM para PyMEs
  - Sistema de Reservas Médicas
  - etc.

---

## Catálogo de 100+ Tipos de Aplicación

A continuación, la lista completa de tipos de aplicación que deben cargarse en la tabla `application_types`, organizados por servicio:

### 1. SOFTWARE DEVELOPMENT (25 tipos)

#### Sistemas de Punto de Venta (POS)
1. POS para Veterinarias
2. POS para Restaurantes
3. POS para Retail/Tiendas
4. POS para Farmacias
5. POS para Supermercados

#### E-commerce
6. E-commerce B2B (Business to Business)
7. E-commerce B2C (Business to Consumer)
8. Marketplace Multi-vendedor
9. Tienda Online con Suscripciones
10. E-commerce para Dropshipping

#### Sistemas de Gestión (ERP/CRM)
11. CRM para PyMEs
12. ERP de Manufactura
13. Sistema de Gestión de Inventarios
14. Sistema de Facturación Electrónica
15. Sistema de Contabilidad en la Nube

#### Salud (Healthtech)
16. Historia Clínica Electrónica
17. Sistema de Telemedicina
18. Agenda Médica Online
19. Sistema de Gestión Hospitalaria
20. App de Citas para Consultorios

#### Educación (Edtech)
21. Plataforma LMS (Learning Management System)
22. Sistema de Gestión Escolar
23. Plataforma de Cursos Online
24. App de Tareas y Calificaciones
25. Sistema de Admisiones Universitarias

---

### 2. SAAS PLATFORMS (20 tipos)

#### Gestión Empresarial
26. SaaS de Gestión de Proyectos
27. SaaS de Recursos Humanos (HCM)
28. SaaS de Nómina Electrónica
29. SaaS de Control de Asistencia
30. SaaS de Evaluación de Desempeño

#### Ventas y Marketing
31. SaaS de Automatización de Marketing
32. SaaS de Email Marketing
33. SaaS de Gestión de Leads
34. SaaS de Embudos de Venta
35. SaaS de Análisis de Clientes

#### Operaciones
36. SaaS de Gestión de Flotas
37. SaaS de Logística y Envíos
38. SaaS de Control de Almacenes (WMS)
39. SaaS de Compras y Aprovisionamiento
40. SaaS de Gestión de Activos

#### Finanzas
41. SaaS de Facturación Recurrente
42. SaaS de Conciliación Bancaria
43. SaaS de Presupuesto Empresarial
44. SaaS de Reportes Financieros
45. SaaS de Auditoría Interna

---

### 3. ENTERPRISE SOLUTIONS (15 tipos)

#### Integración de Sistemas
46. Sistema de Integración API Gateway
47. Middleware de Integración Empresarial
48. Sistema de Sincronización de Datos
49. Plataforma de Orquestación de Servicios
50. Sistema de ETL (Extract, Transform, Load)

#### Infraestructura
51. Sistema de Monitoreo de Servidores
52. Plataforma de Gestión de Cloud Híbrido
53. Sistema de Backup Automatizado
54. Plataforma de Continuidad de Negocio
55. Sistema de Disaster Recovery

#### Seguridad Empresarial
56. Sistema de Gestión de Identidades (IAM)
57. Plataforma de Seguridad Perimetral
58. Sistema de Detección de Intrusos
59. Plataforma de Compliance Normativo
60. Sistema de Auditoría de Seguridad

---

### 4. AI & AUTOMATION (20 tipos)

#### Automatización de Procesos (RPA)
61. Bot de Automatización de Facturas
62. Sistema de Procesamiento de Órdenes
63. Bot de Clasificación de Documentos
64. Sistema de Extracción de Datos (OCR)
65. Automatización de Respuestas a Clientes

#### Inteligencia Artificial Aplicada
66. Chatbot con IA Conversacional
67. Sistema de Recomendación de Productos
68. Motor de Predicción de Ventas
69. Sistema de Detección de Fraudes
70. Análisis de Sentimiento en Redes Sociales

#### Machine Learning
71. Modelo Predictivo de Churn
72. Sistema de Clasificación Automática
73. Motor de Personalización de Contenido
74. Sistema de Visión Computarizada
75. Plataforma de Entrenamiento de Modelos

#### Procesamiento de Lenguaje Natural
76. Traductor Automático Especializado
77. Resumen Automático de Documentos
78. Sistema de Búsqueda Semántica
79. Generador de Contenido con IA
80. Analizador de Contratos Legales

---

### 5. MODERNIZATION (10 tipos)

#### Migración de Legacy
81. Migración de Mainframe a Cloud
82. Modernización de Aplicaciones Desktop a Web
83. Migración de Base de Datos SQL a NoSQL
84. Refactorización de Monolito a Microservicios
85. Actualización de Framework Obsoleto

#### Optimización de Performance
86. Sistema de Caché Distribuido
87. Plataforma de CDN Propio
88. Optimizador de Queries de Base de Datos
89. Sistema de Balanceo de Carga Inteligente
90. Plataforma de APM (Application Performance Monitoring)

---

### 6. UX ENGINEERING (10 tipos)

#### Design Systems
91. Sistema de Diseño Corporativo
92. Biblioteca de Componentes UI
93. Guía de Estilos Interactiva
94. Sistema de Iconografía Personalizada
95. Plataforma de Tokens de Diseño

#### Accesibilidad
96. Auditoría de Accesibilidad WCAG
97. Sistema de Lectores de Pantalla
98. Plataforma de Contraste y Color
99. Herramienta de Navegación por Teclado
100. Validador de Accesibilidad Automática

#### Investigación de Usuarios
101. Plataforma de Testing de Usabilidad
102. Sistema de Heatmaps y Grabaciones
103. Herramienta de Encuestas NPS
104. Plataforma de User Journey Mapping
105. Sistema de Análisis de Comportamiento

---

## Implementación en Base de Datos

### Script SQL para Insertar Tipos de Aplicación

```sql
-- Insertar tipos de aplicación para Software Development (service_id = 1)
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(1, 'POS para Veterinarias', 'Sistema de punto de venta especializado para clínicas veterinarias', 1),
(1, 'POS para Restaurantes', 'Sistema de gestión de pedidos y mesas para restaurantes', 1),
(1, 'POS para Retail', 'Sistema de ventas para tiendas minoristas', 1),
-- ... continuar con los 25 tipos de Software Development

-- Insertar tipos para SaaS Platforms (service_id = 2)
INSERT INTO application_types (service_id, name, description, is_active) VALUES
(2, 'SaaS de Gestión de Proyectos', 'Plataforma multi-tenant para gestión ágil de proyectos', 1),
-- ... continuar con los 20 tipos de SaaS

-- Repetir para cada servicio (service_id 1-6)
```

---

## Relación con Leads

Cuando un cliente potencial llena el formulario de contacto:

1. **Selecciona el servicio de interés** (categoría)
   - Ej: "Software Development"

2. **Selecciona el tipo de aplicación** (subcategoría/tipo de negocio)
   - Ej: "POS para Veterinarias"

3. **El sistema calcula lead_score** basado en:
   - Tipo de aplicación (algunos tienen mayor valor)
   - Campos completados
   - Calidad de la información

4. **El admin puede filtrar leads** por:
   - Servicio (categoría)
   - Tipo de aplicación (subcategoría/negocio)

---

## Criterios de Aceptación

- [ ] **105 tipos de aplicación** catalogados en la BD
- [ ] Cada tipo asociado a **exactamente un servicio** (service_id)
- [ ] Interfaz de admin permite **activar/desactivar** tipos individualmente
- [ ] Formulario de contacto muestra **solo tipos activos** del servicio seleccionado
- [ ] API endpoint `/api/application-types?service_id=X` retorna tipos filtrados
- [ ] Leads pueden vincularse a **múltiples tipos** de aplicación (tabla pivote)

---

## Notas de Implementación

### Sobre la Taxonomía

Esta estructura de **Categoría → Subcategoría** permite:

1. **Segmentación de mercado**: Saber qué tipos de negocio atiende FaruTech
2. **Priorización de desarrollo**: Enfocarse en los tipos más rentables
3. **Marketing dirigido**: Crear landing pages específicas por tipo
4. **Pricing diferenciado**: Asignar rangos de precio por tipo de aplicación

### Futuras Extensiones

- Añadir campo `complexity_level` (Bajo, Medio, Alto) para estimación effort
- Añadir campo `avg_project_value` para scoring de leads
- Añadir campo `typical_timeline` para expectativas de cliente
- Crear tags transversales (ej: "Mobile-first", "AI-powered", "Multi-tenant")

---

*Documento creado para complementar el plan principal*  
*Versión: 1.0*  
*Fecha: $(date +%Y-%m-%d)*
