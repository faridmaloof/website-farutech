# Plan de Validación e Implementación - FaruTech Platform

## Resumen Ejecutivo

Este documento define el plan detallado para validar el estado actual del proyecto FaruTech e implementar las funcionalidades faltantes según los requerimientos. El plan está dividido en **4 Features** independientes para abordar cada tema de forma aislada y ordenada.

---

# FEATURE 1: Corrección de Errores y Validación Técnica

## Epic E1.1: Validación y Corrección de Errores de Código

### Historia de Usuario HU1.1.1: Corrección de Errores TypeScript
**Como** desarrollador  
**Quiero** que el archivo `servicesData.ts` no tenga errores de sintaxis  
**Para** poder compilar y ejecutar el proyecto sin problemas  

**Tareas:**
- [ ] Revisar línea por línea `src/content/servicesData.ts` buscando errores de sintaxis
- [ ] Verificar que todos los objetos tengan comas correctamente ubicadas
- [ ] Confirmar que todas las cadenas de texto estén correctamente delimitadas
- [ ] Validar que no haya propiedades duplicadas
- [ ] Ejecutar `npm run typecheck` y verificar que pase sin errores
- [ ] Ejecutar `npm run build` y verificar que compile exitosamente

**Criterios de Aceptación:**
- ✅ `npm run typecheck` retorna 0 errores
- ✅ `npm run build` completa sin warnings críticos
- ✅ El bundle de producción es <500KB total

**Estado Actual:** ✅ VALIDADO
- El archivo `servicesData.ts` tiene 485 líneas y está correctamente formado
- TypeScript compilation pasa sin errores
- Build genera bundle de 458KB (JS) + 45KB (CSS)

---

### Historia de Usuario HU1.1.2: Validación de Componentes JSX
**Como** desarrollador  
**Quiero** que los archivos de entry point tengan todos los elementos JSX correctamente cerrados  
**Para** evitar errores de renderizado en cliente y servidor  

**Tareas:**
- [ ] Revisar `src/entry-server.tsx` verificando cierre de `StaticRouter` y componentes anidados
- [ ] Revisar `src/main.tsx` verificando cierre de `BrowserRouter` y `StrictMode`
- [ ] Validar que la indentación sea consistente
- [ ] Confirmar que cada apertura de tag tenga su cierre correspondiente

**Criterios de Aceptación:**
- ✅ No hay errores de sintaxis JSX en los archivos
- ✅ Los componentes están correctamente anidados
- ✅ La indentación es consistente (2 espacios)

**Estado Actual:** ✅ VALIDADO
- `entry-server.tsx`: StaticRouter correctamente cerrado (líneas 13-16)
- `main.tsx`: BrowserRouter y StrictMode correctamente cerrados (líneas 14-18)

---

### Historia de Usuario HU1.1.3: Validación de Configuración Tailwind CSS v4
**Como** desarrollador  
**Quiero** que la configuración de Tailwind sea compatible con la versión instalada  
**Para** evitar warnings del linter CSS  

**Tareas:**
- [ ] Verificar versión de Tailwind instalada en `package.json`
- [ ] Confirmar que `@theme inline` es válido para Tailwind v4
- [ ] Si el linter muestra errores, configurar reglas de ignorado apropiadas
- [ ] Validar que los estilos se apliquen correctamente en el sitio

**Criterios de Aceptación:**
- ✅ Tailwind v4 está instalado
- ✅ `@theme inline` es reconocido como válido
- ✅ No hay warnings de reglas desconocidas en CSS

**Estado Actual:** ✅ VALIDADO
- Tailwind CSS v4 está configurado correctamente
- `@import "tailwindcss"` y `@theme inline` son sintaxis válidas de v4
- El build de CSS genera 45.78 KB sin errores

---

## Epic E1.2: Validación de Arquitectura del Proyecto

### Historia de Usuario HU1.2.1: Verificación de Estructura de Directorios
**Como** arquitecto de software  
**Quiero** confirmar que la estructura del proyecto sigue los estándares establecidos  
**Para** mantener la consistencia y escalabilidad del código  

**Tareas:**
- [ ] Verificar existencia de directorios: `src/`, `api/`, `admin/`, `database/`, `docs/`
- [ ] Confirmar que `api/` contiene la API REST en PHP
- [ ] Confirmar que `admin/` contiene el panel de administración
- [ ] Validar que `database/` tiene los scripts SQL necesarios

**Criterios de Aceptación:**
- ✅ Todos los directorios principales existen
- ✅ La separación frontend/backend es clara
- ✅ Los archivos de configuración están en sus ubicaciones correctas

**Estado Actual:** ✅ VALIDADO
- `/workspace/src` - Frontend React/TypeScript
- `/workspace/api` - API REST PHP
- `/workspace/admin` - Panel de administración PHP
- `/workspace/database` - Scripts SQL (schema.sql, schema_admin.sql)

---

# FEATURE 2: Implementación del Panel de Administración (Backend PHP)

## Epic E2.1: Autenticación y Seguridad del Panel

### Historia de Usuario HU2.1.1: Sistema de Login con Sesiones PHP
**Como** administrador del panel  
**Quiero** poder autenticarme de forma segura  
**Para** acceder a las funciones de gestión del sitio  

**Tareas:**
- [ ] Crear formulario de login en `admin/index.php` o `admin/login.php`
- [ ] Implementar validación de credenciales contra tabla `admin_users`
- [ ] Usar `password_verify()` para verificar contraseñas hasheadas
- [ ] Iniciar sesión PHP con `session_start()` y variables seguras
- [ ] Crear middleware de autenticación para proteger rutas
- [ ] Implementar logout en `admin/logout.php`
- [ ] Añadir protección CSRF en formularios

**Criterios de Aceptación:**
- ✅ El login valida credenciales correctamente
- ✅ Las contraseñas se verifican con `password_verify()`
- ✅ Las sesiones expiran después de inactividad
- ✅ Todas las rutas excepto login están protegidas
- ✅ El logout destruye la sesión correctamente

**Estado Actual:** ⚠️ PARCIALMENTE IMPLEMENTADO
- Existe `admin/index.php` (2504 bytes)
- Existe `admin/logout.php` (134 bytes)
- Existe `admin/config.php` (1364 bytes)
- Se requiere validar implementación completa de autenticación

---

### Historia de Usuario HU2.1.2: Gestión de Usuarios Administradores
**Como** super-administrador  
**Quiero** poder gestionar usuarios del panel  
**Para** controlar quién tiene acceso al sistema  

**Tareas:**
- [ ] CRUD completo de usuarios administradores
- [ ] Formulario de creación con hash de contraseña (`password_hash()`)
- [ ] Formulario de edición de perfil
- [ ] Capacidad de cambiar contraseñas
- [ ] Roles: admin (completo) y editor (limitado)

**Criterios de Aceptación:**
- ✅ Se pueden crear nuevos usuarios admin
- ✅ Las contraseñas se almacenan hasheadas
- ✅ Los roles restringen appropriately el acceso
- ✅ Se puede editar información de usuario

---

## Epic E2.2: Gestión de Ubicaciones Geográficas

### Historia de Usuario HU2.2.1: CRUD de Países, Departamentos y Ciudades
**Como** administrador de contenido  
**Quiero** gestionar la estructura geográfica de cobertura  
**Para** mostrar correctamente las ubicaciones donde opera FaruTech  

**Tareas:**
- [ ] Panel de administración para países (`countries`)
- [ ] Panel para departamentos/estados (`states`) vinculado a países
- [ ] Panel para ciudades (`cities`) vinculado a estados
- [ ] Interfaz jerárquica o tablas relacionadas
- [ ] Operaciones: crear, editar, eliminar, listar
- [ ] Validar que las relaciones se mantengan (foreign keys)

**Criterios de Aceptación:**
- ✅ Se pueden agregar/editar/eliminar países
- ✅ Los estados están vinculados correctamente a países
- ✅ Las ciudades están vinculadas correctamente a estados
- ✅ La interfaz es intuitiva y responsive

**Estado Actual:** ⚠️ PARCIALMENTE IMPLEMENTADO
- Existe `admin/locations.php` (3538 bytes)
- Tablas definidas en `schema_admin.sql`: countries, states, cities
- Se requiere validar funcionalidad completa del CRUD

---

## Epic E2.3: Gestión de Servicios y Tipos de Aplicación

### Historia de Usuario HU2.3.1: CRUD de Servicios Principales (Categorías)
**Como** administrador de servicios  
**Quiero** gestionar los servicios ofrecidos por FaruTech  
**Para** mantener actualizada la oferta de servicios en el sitio  

**Tareas:**
- [ ] Listado de servicios principales con estado (activo/inactivo)
- [ ] Formulario de creación/edición de servicios
- [ ] Campos: nombre, slug, descripción, estado
- [ ] Los 6 servicios por defecto ya están en la BD
- [ ] Toggle para activar/desactivar servicios

**Criterios de Aceptación:**
- ✅ Se muestran todos los servicios en una tabla
- ✅ Se puede cambiar el estado activo/inactivo
- ✅ Se pueden editar nombre y descripción
- ✅ El slug se genera automáticamente o es editable

**Estado Actual:** ⚠️ POR IMPLEMENTAR
- Tabla `services` definida en `schema_admin.sql`
- 6 servicios insertados por defecto
- No hay evidencia de CRUD en el admin

---

### Historia de Usuario HU2.3.2: Gestión de Tipos de Aplicación (Subcategorías)
**Como** administrador de servicios  
**Quiero** definir tipos específicos de aplicaciones por servicio  
**Para** tipificar el tipo de negocio/cliente que se puede atender  

**Tareas:**
- [ ] Catálogo de 100+ tipos de aplicación predefinidos
- [ ] Relación muchos-a-uno con servicios
- [ ] Interfaz para asignar tipos a servicios
- [ ] Checkbox o selector múltiple para selección
- [ ] Tipos sugeridos:
  - Sistemas POS (veterinario, retail, restaurante)
  - E-commerce (B2B, B2C, marketplace)
  - SaaS de gestión (CRM, ERP, HCM)
  - Plataformas educativas (LMS, e-learning)
  - Sistemas de reservas (citas, hoteles, restaurantes)
  - Apps de delivery y logística
  - Fintech (pagos, facturación, contabilidad)
  - Healthtech (historias clínicas, telemedicina)
  - Y 90+ adicionales...

**Criterios de Aceptación:**
- ✅ Al menos 100 tipos de aplicación catalogados
- ✅ Cada tipo está asociado a uno o más servicios
- ✅ Interfaz intuitiva para seleccionar múltiples tipos
- ✅ Se pueden activar/desactivar tipos individualmente

**Estado Actual:** ⚠️ POR IMPLEMENTAR
- Tabla `application_types` definida en `schema_admin.sql`
- Tabla pivote `lead_application_types` definida
- No hay datos seed ni interfaz de gestión

---

## Epic E2.4: Gestión de Información de Contacto

### Historia de Usuario HU2.4.1: Edición de Datos de Contacto Únicos
**Como** administrador de sitio  
**Quiero** editar la información de contacto de FaruTech  
**Para** mantener actualizados los datos en el frontend  

**Tareas:**
- [ ] Formulario único (solo una fila en BD) con campos:
  - Teléfono
  - Email
  - Dirección física
  - Enlaces a redes sociales (JSON: LinkedIn, GitHub, Twitter, etc.)
- [ ] Validación de formatos (email, URL, teléfono)
- [ ] Guardado automático o con confirmación
- [ ] Vista previa de cómo se verá en el frontend

**Criterios de Aceptación:**
- ✅ Solo existe un registro de contacto
- ✅ Los campos se validan correctamente
- ✅ Las redes sociales se guardan como JSON
- ✅ La información se refleja en el frontend vía API

**Estado Actual:** ⚠️ PARCIALMENTE IMPLEMENTADO
- Tabla `contact_info` definida en `schema_admin.sql`
- Registro por defecto insertado
- Se requiere interfaz de edición en el admin

---

## Epic E2.5: Gestión del Blog con Editor WYSIWYG

### Historia de Usuario HU2.5.1: CRUD de Entradas de Blog
**Como** editor de contenido  
**Quiero** crear y gestionar entradas de blog  
**Para** publicar contenido SEO-friendly en el sitio  

**Tareas:**
- [ ] Listado de posts con filtros (borrador/publicado)
- [ ] Formulario de creación/edición con campos:
  - Título
  - Slug personalizado
  - Extracto/resumen
  - Contenido HTML
  - Meta título, descripción, keywords
  - Imagen destacada
  - Categoría
  - Estado (draft/published)
- [ ] Editor WYSIWYG moderno (Tiptap recomendado)
- [ ] Subida de imágenes integrada
- [ ] Vista previa antes de publicar
- [ ] Fecha de publicación programable

**Criterios de Aceptación:**
- ✅ Se pueden crear posts completos
- ✅ El editor permite formato rico (negrita, listas, tablas, enlaces)
- ✅ Se pueden subir y insertar imágenes
- ✅ Los campos SEO se completan correctamente
- ✅ Los posts se pueden publicar o guardar como borrador

**Estado Actual:** ⚠️ POR IMPLEMENTAR
- Tablas `blog_categories` y `blog_posts` definidas
- 4 categorías por defecto insertadas
- No hay interfaz de gestión en el admin

---

### Historia de Usuario HU2.5.2: Integración de Editor WYSIWYG Moderno
**Como** editor de contenido  
**Quiero** un editor moderno y fácil de usar  
**Para** crear contenido rico sin saber HTML  

**Tareas:**
- [ ] Investigar e integrar Tiptap (recomendado por ser moderno y extensible)
- [ ] Alternativas: CKEditor 5, Quill, TinyMCE
- [ ] Configurar extensiones para:
  - Encabezados (H1-H6)
  - Formato de texto (negrita, cursiva, subrayado)
  - Listas (ordenadas y desordenadas)
  - Tablas
  - Enlaces y embeds
  - Imágenes con upload
  - Código y bloques de código
  - HTML personalizado (para usuarios avanzados)
- [ ] Guardar contenido como HTML limpio
- [ ] Sanitización de entrada para seguridad

**Criterios de Aceptación:**
- ✅ El editor carga rápidamente
- ✅ Todas las funciones básicas están disponibles
- ✅ Las imágenes se suben y almacenan correctamente
- ✅ El HTML generado es limpio y seguro
- ✅ Funciona en mobile y desktop

**Recomendación:** **Tiptap** es la mejor opción porque:
- Es headless y altamente personalizable
- Basado en ProseMirror (robusto y moderno)
- Tiene excelente soporte para React/Vue
- Permite extensiones modulares
- Es usado por empresas grandes (Notion, Linear)

---

## Epic E2.6: API REST para Integración con Frontend

### Historia de Usuario HU2.6.1: Endpoints Públicos de Consulta
**Como** desarrollador frontend  
**Quiero** consumir datos vía API REST  
**Para** mostrar contenido dinámico en el sitio  

**Tareas:**
- [ ] GET `/api/services` - Lista servicios activos
- [ ] GET `/api/services/:slug` - Detalle de servicio
- [ ] GET `/api/application-types` - Tipos de aplicación
- [ ] GET `/api/contact` - Información de contacto
- [ ] GET `/api/locations` - Países, estados, ciudades
- [ ] GET `/api/blog/posts` - Posts publicados
- [ ] GET `/api/blog/posts/:slug` - Post individual
- [ ] GET `/api/blog/categories` - Categorías de blog
- [ ] Respuestas en formato JSON
- [ ] Manejo de errores y códigos HTTP apropiados
- [ ] CORS configurado para el dominio del frontend

**Criterios de Aceptación:**
- ✅ Todos los endpoints retornan JSON válido
- ✅ Los filtros y parámetros funcionan correctamente
- ✅ Los errores se manejan apropiadamente (404, 500)
- ✅ El rendimiento es aceptable (<200ms por request)

**Estado Actual:** ⚠️ PARCIALMENTE IMPLEMENTADO
- API REST existe en `/api/index.php`
- Endpoints actuales: `/contact`, `/newsletter`, `/health`
- Faltan endpoints para servicios, blog, locations

---

### Historia de Usuario HU2.6.2: Endpoint de Formulario de Contacto
**Como** visitante del sitio  
**Quiero** enviar un mensaje de contacto  
**Para** solicitar información sobre servicios  

**Tareas:**
- [ ] POST `/api/contact` recibe datos del formulario
- [ ] Validación de datos requeridos
- [ ] Guardado en tabla `leads`
- [ ] Cálculo automático de lead_score (ya existe trigger)
- [ ] Envío de email de notificación (opcional)
- [ ] Respuesta JSON de éxito/error
- [ ] Protección contra spam (honeypot o CAPTCHA)

**Criterios de Aceptación:**
- ✅ El formulario envía datos correctamente
- ✅ Los leads se almacenan en la BD
- ✅ El lead_score se calcula automáticamente
- ✅ Se recibe confirmación de envío

**Estado Actual:** ✅ IMPLEMENTADO
- Endpoint `/api/contact` existe
- LeadRepository y LeadService implementados
- Trigger de lead_score configurado en BD

---

# FEATURE 3: Rediseño Visual del Frontend

## Epic E3.1: Sistema de Diseño con Identidad por Servicio

### Historia de Usuario HU3.1.1: Definición de Paleta de Colores Moderna
**Como** diseñador UI  
**Quiero** una paleta de colores coherente y accesible  
**Para** mantener consistencia visual en todo el sitio  

**Tareas:**
- [ ] Revisar paleta actual en `global.css`
- [ ] Validar contraste WCAG 2.2 AA (≥4.5:1 para texto normal)
- [ ] Definir colores por servicio ya existentes:
  - Software Development: Azul (#3FC1FF, #7C5CFF)
  - SaaS Platforms: Verde (#22E07C, #14B8A6)
  - Enterprise Solutions: Naranja/Rosa (#FF7A1A, #FF3D71)
  - AI & Automation: Cian/Azul (#36E0C0, #3F9BFF)
  - Modernization: Amarillo/Naranja (#FFB020, #FF7A1A)
  - UX Engineering: Violeta/Rosa (#B66BFF, #FF6BD6)
- [ ] Asegurar que los colores funcionen en modo claro
- [ ] Documentar uso de cada color

**Criterios de Aceptación:**
- ✅ Todos los colores pasan validación de contraste
- ✅ Cada servicio tiene identidad visual única
- ✅ Los colores son consistentes en todos los componentes

**Estado Actual:** ✅ IMPLEMENTADO
- Paleta definida en `global.css` con variables CSS
- Cada servicio tiene sus colores en `[data-service]`
- Uso de espacio OKLCH para consistencia perceptual

---

### Historia de Usuario HU3.1.2: Landing Pages Únicas por Servicio
**Como** visitante interesado en un servicio  
**Quiero** ver una página con diseño único y personalidad propia  
**Para** entender el valor específico de ese servicio  

**Tareas:**
- [ ] Revisar implementación actual de `ServiceLandingPage`
- [ ] Cada landing debe tener:
  - Hero section con llamado a la acción único
  - Descripción detallada del servicio
  - Sección de problemas que resuelve
  - Sección de beneficios/solución
  - Caso de éxito relacionado
  - FAQ específico del servicio
  - Formulario de contacto contextual
  - Footer específico
- [ ] Distribución de elementos distinta por servicio
- [ ] Iconografía personalizada
- [ ] Microinteracciones únicas (hover, scroll, animations)
- [ ] Tipografía y spacing adaptados

**Criterios de Aceptación:**
- ✅ Cada servicio tiene URL dedicada `/services/:slug`
- ✅ El diseño es único (no template repetido)
- ✅ La personalidad coincide con el tipo de servicio
- ✅ Todos los elementos están presentes

**Estado Actual:** ⚠️ POR VALIDAR
- `servicesData.ts` tiene datos estructurados para 6 servicios
- Se requiere verificar implementación de páginas landing
- Falta validar unicidad visual de cada página

---

## Epic E3.2: Responsividad y Mobile-First

### Historia de Usuario HU3.2.1: Diseño Responsive Completo
**Como** usuario móvil  
**Quiero** navegar el sitio cómodamente desde mi dispositivo  
**Para** acceder a la información en cualquier contexto  

**Tareas:**
- [ ] Auditar vistas en mobile (<640px), tablet (640-1024px), desktop (>1024px)
- [ ] Validar enfoque mobile-first en CSS
- [ ] Menú hamburguesa funcional en mobile
- [ ] Grids y layouts adaptables
- [ ] Imágenes responsive con `srcset`
- [ ] Touch targets ≥44px para elementos interactivos
- [ ] Testing en dispositivos reales y emuladores

**Criterios de Aceptación:**
- ✅ El sitio es completamente usable en mobile
- ✅ No hay overflow horizontal
- ✅ Los textos son legibles sin zoom
- ✅ Las interacciones son fluidas en touch

---

### Historia de Usuario HU3.2.2: Panel Admin Responsive
**Como** administrador  
**Quiero** gestionar el panel desde cualquier dispositivo  
**Para** poder trabajar remotamente  

**Tareas:**
- [ ] Layout adaptable del panel (sidebar colapsable en mobile)
- [ ] Tablas con scroll horizontal o card view en mobile
- [ ] Formularios apilados verticalmente en pantallas pequeñas
- [ ] Menú de navegación accesible en mobile
- [ ] Botones y controles de tamaño adecuado para touch

**Criterios de Aceptación:**
- ✅ El panel es usable en mobile y tablet
- ✅ Todas las funciones están accesibles
- ✅ La experiencia es consistente entre dispositivos

---

# FEATURE 4: Integración Frontend-Backend y Deploy

## Epic E4.1: Consumo de API desde React

### Historia de Usuario HU4.1.1: Hook Personalizado para API Calls
**Como** desarrollador frontend  
**Quiero** un hook reutilizable para consumir la API  
**Para** manejar estados de carga y error consistentemente  

**Tareas:**
- [ ] Crear hook `useApi` o similar
- [ ] Manejar estados: loading, success, error
- [ ] Soporte para cache básico
- [ ] Timeout configurable
- [ ] Reintentos automáticos opcionales
- [ ] Cancelación de requests pendientes

**Criterios de Aceptación:**
- ✅ El hook es reutilizable en cualquier componente
- ✅ Los estados se manejan correctamente
- ✅ Los errores se muestran amigablemente al usuario

---

### Historia de Usuario HU4.1.2: Integración de Datos Dinámicos
**Como** desarrollador frontend  
**Quiero** que el contenido se cargue desde la API  
**Para** que sea editable desde el panel de administración  

**Tareas:**
- [ ] Servicios: consumir desde `/api/services`
- [ ] Contacto: consumir desde `/api/contact`
- [ ] Blog: consumir desde `/api/blog/posts`
- [ ] Ubicaciones: consumir desde `/api/locations`
- [ ] Manejar estados de carga (skeletons o spinners)
- [ ] Manejar errores de conexión
- [ ] Cache estratégico para performance

**Criterios de Aceptación:**
- ✅ Los datos se muestran correctamente
- ✅ El fallback a datos estáticos funciona si la API falla
- ✅ La performance es aceptable (LCP <2.5s)

---

## Epic E4.2: Configuración de Entorno y Deploy

### Historia de Usuario HU4.2.1: Documentación de Instalación
**Como** nuevo desarrollador  
**Quiero** instrucciones claras para configurar el proyecto  
**Para** poder empezar a trabajar rápidamente  

**Tareas:**
- [ ] Crear archivo `.env.example` con variables necesarias:
  ```
  DB_HOST=localhost
  DB_NAME=farutech_db
  DB_USER=root
  DB_PASS=
  API_URL=http://localhost/api
  ```
- [ ] Documentar pasos para:
  1. Clonar repositorio
  2. Instalar dependencias npm
  3. Configurar base de datos MySQL
  4. Ejecutar scripts SQL
  5. Configurar variables de entorno
  6. Levantar frontend (`npm run dev`)
  7. Levantar backend (PHP server)
- [ ] Incluir troubleshooting común

**Criterios de Aceptación:**
- ✅ Cualquier desarrollador puede configurar el proyecto en <30 min
- ✅ No hay pasos ambiguos
- ✅ Los errores comunes tienen solución documentada

---

### Historia de Usuario HU4.2.2: Script de Base de Datos Completo
**Como** DBA  
**Quiero** un script SQL completo con datos seed  
**Para** inicializar la base de datos rápidamente  

**Tareas:**
- [ ] Unificar `schema.sql` y `schema_admin.sql` si es necesario
- [ ] Incluir todos los triggers y stored procedures
- [ ] Datos seed:
  - Usuario admin por defecto (user: `admin`, pass: `Admin123!`)
  - 6 servicios iniciales
  - 4 categorías de blog
  - 100+ tipos de aplicación
  - Contacto por defecto
  - Países básicos (Colombia, México, Argentina, etc.)
- [ ] Comentar el script claramente
- [ ] Probar en MySQL 5.7+ y MariaDB 10.2+

**Criterios de Aceptación:**
- ✅ El script se ejecuta sin errores
- ✅ Todas las tablas se crean correctamente
- ✅ Los datos seed son útiles para desarrollo

**Estado Actual:** ⚠️ PARCIALMENTE IMPLEMENTADO
- `schema.sql` existe (11KB) - Leads y newsletter
- `schema_admin.sql` existe (7KB) - Admin, servicios, blog
- Faltan 100+ tipos de aplicación en el seed

---

## Epic E4.3: Seguridad y Mejores Prácticas

### Historia de Usuario HU4.3.1: Hardening de Seguridad
**Como** security engineer  
**Quiero** que el sitio siga mejores prácticas de seguridad  
**Para** proteger datos de usuarios y la infraestructura  

**Tareas:**
- [ ] Sanitización de todas las entradas en backend PHP
- [ ] Prepared statements para todas las queries SQL (ya implementado)
- [ ] Protección CSRF en formularios del admin
- [ ] Headers de seguridad HTTP:
  - `Content-Security-Policy`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Strict-Transport-Security`
- [ ] HTTPS forzado en producción
- [ ] Rate limiting en endpoints de API
- [ ] Logs de auditoría para acciones críticas

**Criterios de Aceptación:**
- ✅ No hay vulnerabilidades SQL injection
- ✅ Los formularios están protegidos contra CSRF
- ✅ Los headers de seguridad están configurados
- ✅ Las contraseñas nunca se almacenan en texto plano

**Estado Actual:** ⚠️ PARCIALMENTE IMPLEMENTADO
- API usa PDO con prepared statements
- Headers de seguridad parcialmente configurados
- Falta validación de CSRF en admin

---

# RESUMEN DE ESTADO ACTUAL VS REQUERIDO

| Componente | Estado | Observaciones |
|------------|--------|---------------|
| **Frontend React** | ✅ Implementado | Build pasa sin errores, TypeScript OK |
| **API REST PHP** | ⚠️ Parcial | Endpoints básicos existen, faltan servicios/blog |
| **Panel Admin** | ⚠️ Parcial | Archivos existen, falta validar CRUDs completos |
| **Base de Datos** | ⚠️ Parcial | Schema definido, faltan 100+ application types |
| **Autenticación** | ⚠️ Por validar | Archivos existen, requiere testing |
| **Blog con WYSIWYG** | ❌ No implementado | Schema listo, falta interfaz y editor |
| **Landing Pages Únicas** | ⚠️ Por validar | Datos existen, falta verificar UI única |
| **Responsive Design** | ⚠️ Por auditar | Tailwind configurado, requiere testing multi-device |
| **Documentación** | ❌ No implementado | Faltan instrucciones de instalación |

---

# ORDEN DE IMPLEMENTACIÓN RECOMENDADO

1. **Feature 1** (Validación técnica) - 1 día
   - Corregir errores si existen
   - Validar build y typecheck

2. **Feature 2** (Panel Admin Backend) - 5-7 días
   - Autenticación completa
   - CRUD de ubicaciones
   - CRUD de servicios + 100 application types
   - CRUD de contacto
   - Blog con Tiptap

3. **Feature 3** (Rediseño Frontend) - 4-5 días
   - Validar lands únicas por servicio
   - Auditoría responsive
   - Ajustes de UI/UX

4. **Feature 4** (Integración y Deploy) - 3-4 días
   - Hooks de API en React
   - Consumo de datos dinámicos
   - Documentación
   - Testing final

**Total estimado:** 13-17 días hábiles

---

# PROMPT DE EJEMPLO PARA IMPLEMENTAR UNA ÉPICA

```
Por favor implementa la Épica E2.5: Gestión del Blog con Editor WYSIWYG

Incluye:
1. Interfaz de listado de posts con filtros (borrador/publicado)
2. Formulario de creación/edición con todos los campos
3. Integración de Tiptap como editor WYSIWYG
4. Subida de imágenes integrada
5. Campos SEO (meta title, description, keywords)
6. Select de categorías
7. Toggle de estado draft/published
8. Vista previa antes de publicar

Entregables:
- Archivos PHP del admin (/admin/blog.php, /admin/blog-edit.php)
- Estilos CSS necesarios
- Endpoints de API (/api/blog/*)
- Instrucciones de uso

Prioriza:
- Seguridad (sanitización de HTML, CSRF protection)
- UX del editor (que sea intuitivo)
- Performance (lazy loading de imágenes)
```

---

# NOTAS ADICIONALES

## Sobre Laravel vs PHP Nativo

**Decisión: Mantener PHP Nativo**

Razones:
1. **Copy-paste simplicity**: El requerimiento explícito es "copiar y pegar sin más cosas"
2. **Laravel requiere**: Composer, configuración adicional, curva de aprendizaje
3. **PHP nativo es suficiente**: Para el alcance actual, un router simple y PDO bastan
4. **Subdominio api.farutech.com**: Es viable pero añade complejidad de deployment
5. **Mantenibilidad**: El equipo actual conoce PHP nativo

Si en el futuro se requiere escalar:
- Migrar a Laravel sería sencillo (la estructura ya está orientada a objetos)
- O usar Slim/Flight como micro-framework intermedio

## Sobre Admin vs Console

**Recomendación: Mantener `/admin`**

Razones:
1. **Convención universal**: `/admin` es el estándar de la industria
2. **Claridad semántica**: "Admin" implica administración completa
3. **"Console" puede confundir**: Suena más a CLI o consola de comandos
4. **SEO**: No afecta (está bloqueado por robots.txt)
5. **Accesibilidad**: Más intuitivo para usuarios no técnicos

Alternativa considerada: `/dashboard` (pero es menos específico)

## Sobre Tiptap vs Otros Editores

**Recomendación: Tiptap**

Comparativa:

| Editor | Modernidad | Extensibilidad | React Integration | Curva | License |
|--------|-----------|----------------|-------------------|-------|---------|
| **Tiptap** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Media | MIT |
| CKEditor 5 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Alta | GPL/Commercial |
| TinyMCE | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | Baja | GPL/Commercial |
| Quill | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | Baja | BSD |

**Tiptap gana porque:**
- Headless: tú controlas la UI
- Basado en ProseMirror (muy robusto)
- Extensiones modulares
- Usado por Notion, Linear, Storyblok
- Comunidad activa y documentación excelente
- Gratuito (MIT license)

---

# PRÓXIMOS PASOS INMEDIATOS

1. **Crear archivos de feature individuales** en `docs/features/`:
   - `docs/features/01-validation-and-fixes.md`
   - `docs/features/02-admin-panel-backend.md`
   - `docs/features/03-frontend-redesign.md`
   - `docs/features/04-integration-deploy.md`

2. **Priorizar Feature 2** (Admin Panel Backend) por ser la más crítica

3. **Comenzar con HU2.1.1** (Autenticación) como primer sprint

4. **Estimar effort real** después de validar código existente

---

*Documento creado: $(date)*  
*Última actualización: $(date)*  
*Versión: 1.1 - Incluye referencia a especificación de categorías y tipos de negocio*

---

# DOCUMENTOS RELACIONADOS

## Especificación de Categorías y Tipos de Negocio

El documento `categories-and-business-types-spec.md` complementa este plan definiendo:

- **6 categorías** = Servicios principales de FaruTech
- **105 subcategorías** = Tipos de aplicación/negocio que tipifican al cliente

Esta taxonomía permite:
1. Segmentar el mercado por tipo de negocio
2. Priorizar desarrollo en aplicaciones más rentables
3. Crear landing pages específicas por tipo
4. Asignar rangos de precio diferenciados

**Ver:** [`docs/features/categories-and-business-types-spec.md`](./categories-and-business-types-spec.md)
