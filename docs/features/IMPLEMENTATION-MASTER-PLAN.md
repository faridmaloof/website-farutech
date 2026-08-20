# Plan Maestro de Implementación - FaruTech Platform

## Última Actualización: 2025

Este documento define el plan detallado para implementar la plataforma FaruTech con **backend en Laravel Lumen**, **frontend en React**, **Mini CRM integrado**, **sistema de notificaciones híbrido (Telegram + WhatsApp)**, y **panel de administración SPA**.

---

## 📋 ESTRUCTURA DEL DOCUMENTO

1. [Feature 1: Correcciones y Validación Técnica](#feature-1-correcciones-y-validación-técnica) ✅ COMPLETADO
2. [Feature 2: Backend API + Mini CRM + Notificaciones](#feature-2-backend-api--mini-crm--notificaciones) ⚠️ EN PROGRESO
3. [Feature 3: Rediseño Visual y UX](#feature-3-rediseño-visual-y-ux) ⏳ PENDIENTE
4. [Feature 4: Integración y Deploy](#feature-4-integración-y-deploy) ⏳ PENDIENTE
5. [Guía de Validación entre Fases](#guía-de-validación-entre-fases)
6. [Criterios de Aceptación por Feature](#criterios-de-aceptación-por-feature)

---

## FEATURE 1: Correcciones y Validación Técnica ✅ COMPLETADO

### Epic E1.1: Validación y Corrección de Errores de Código

#### Historia de Usuario HU1.1.1: Corrección de Errores TypeScript
**Como** desarrollador  
**Quiero** que el archivo `servicesData.ts` no tenga errores de sintaxis  
**Para** poder compilar y ejecutar el proyecto sin problemas  

**Estado:** ✅ **COMPLETADO**
- Archivo `src/content/servicesData.ts` corregido (485 líneas)
- `npx tsc --noEmit` retorna 0 errores
- `npm run build` genera bundle de 458KB JS + 47KB CSS
- `npm run build:seo` prerenderiza 22 rutas exitosamente

#### Historia de Usuario HU1.1.2: Validación de Componentes JSX
**Estado:** ✅ **COMPLETADO**
- `src/entry-server.tsx`: StaticRouter correctamente cerrado
- `src/main.tsx`: BrowserRouter y StrictMode correctamente cerrados

#### Historia de Usuario HU1.1.3: Validación de Configuración Tailwind CSS v4
**Estado:** ✅ **COMPLETADO**
- Tailwind CSS v4 configurado con sintaxis `@theme inline`
- Build de CSS genera 47KB sin errores

---

## FEATURE 2: Backend API + Mini CRM + Notificaciones ⚠️ EN PROGRESO

### Arquitectura Backend: Laravel Lumen

**Decisión Arquitectónica:** Migrar de PHP nativo a **Laravel Lumen** por:
- Soporte nativo para colas (emails, notificaciones)
- Programación de tareas (blog programado)
- ORM Eloquent para relaciones complejas (CRM)
- Middleware robusto para autenticación JWT
- Testing integrado con PHPUnit

### Estructura del Backend `/api/`

```
api/
├── composer.json              # Laravel Lumen + dependencias
├── .env                       # Variables: DB, Telegram, WhatsApp, SMTP
├── .env.example               # Template de configuración
├── public/
│   └── index.php              # Entry point (accesible via farutech.com/api)
└── app/
    ├── Http/
    │   ├── Controllers/       # Controladores REST
    │   │   ├── ServiceController.php
    │   │   ├── ApplicationTypeController.php
    │   │   ├── ContactInfoController.php
    │   │   ├── LocationController.php
    │   │   ├── BlogController.php
    │   │   ├── BlogCategoryController.php
    │   │   ├── LeadController.php
    │   │   ├── CrmController.php
    │   │   ├── NewsletterController.php
    │   │   ├── AuthController.php
    │   │   ├── DashboardController.php
    │   │   ├── NotificationSettingsController.php
    │   │   └── HealthController.php
    │   ├── Middleware/
    │   │   ├── CorsMiddleware.php
    │   │   ├── JwtMiddleware.php
    │   │   └── RoleMiddleware.php
    │   └── Requests/          # Validaciones de formularios
    │       ├── StoreLeadRequest.php
    │       ├── StoreBlogPostRequest.php
    │       └── UpdateLeadStatusRequest.php
    ├── Models/                # Modelos Eloquent
    │   ├── User.php
    │   ├── Service.php
    │   ├── ApplicationType.php
    │   ├── ContactInfo.php
    │   ├── Location.php
    │   ├── BlogPost.php
    │   ├── BlogCategory.php
    │   ├── Lead.php
    │   ├── LeadNote.php
    │   ├── NewsletterSubscriber.php
    │   ├── NewsletterCampaign.php
    │   ├── ContactMessage.php
    │   └── NotificationSetting.php
    ├── Services/              # Lógica de negocio
    │   ├── TelegramService.php
    │   ├── WhatsAppService.php
    │   ├── EmailService.php
    │   ├── CrmService.php
    │   └── NewsletterService.php
    ├── Jobs/                  # Colas para procesos pesados
    │   ├── SendTelegramNotification.php
    │   ├── SendWhatsAppNotification.php
    │   ├── SendEmailNotification.php
    │   ├── ProcessNewsletterCampaign.php
    │   └── PublishScheduledBlogPost.php
    ├── Events/                # Eventos del sistema
    │   ├── NewLeadReceived.php
    │   ├── LeadStatusChanged.php
    │   └── BlogPostPublished.php
    └── Listeners/             # Escuchadores de eventos
        ├── SendLeadNotifications.php
        └── TrackBlogStats.php
```

### Base de Datos - Migraciones

| Migración | Tabla | Descripción |
|-----------|-------|-------------|
| 001 | `users` | Administradores con roles y JWT tokens |
| 002 | `services` | 6 servicios principales |
| 003 | `application_types` | 105 tipos de aplicación pre-cargados |
| 004 | `locations` | Países, estados, ciudades (jerárquico) |
| 005 | `blog_categories` | Categorías de blog |
| 006 | `blog_posts` | Posts con programación (`published_at`) |
| 007 | `leads` | Leads con estados CRM y prioridad |
| 008 | `lead_notes` | Historial de interacciones con leads |
| 009 | `contact_messages` | Mensajes de formulario de contacto |
| 010 | `newsletter_subscribers` | Suscriptores con token de unsubscribe |
| 011 | `newsletter_campaigns` | Campañas programadas y enviadas |
| 012 | `notification_settings` | Config Telegram, WhatsApp, SMTP |
| 013 | `audit_logs` | Traza de acciones de administradores |

### Mini CRM - Estados y Flujo

```
Estados del Lead:
┌─────────────┐
│    NEW      │ ← Lead entra por formulario
└──────┬──────┘
       ↓
┌─────────────┐
│  CONTACTED  │ ← Admin contacta inicialmente
└──────┬──────┘
       ↓
┌─────────────┐
│  QUALIFIED  │ ← Lead calificado (presupuesto, timeline)
└──────┬──────┘
       ↓
┌─────────────┐
│   PROPOSAL  │ ← Propuesta enviada
└──────┬──────┘
       ↓
┌─────────────┐
│ NEGOTIATION │ ← En negociación
└──────┬──────┘
       ↓
       ├──────────────┬──────────────┐
       ↓              ↓              ↓
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ CLOSED_WON  │ │ CLOSED_LOST │ │ UNREACHABLE │
└─────────────┘ └─────────────┘ └─────────────┘
```

**Campos adicionales en `leads`:**
- `status` (enum: new, contacted, qualified, proposal, negotiation, closed_won, closed_lost, unreachable)
- `priority` (enum: low, medium, high, urgent)
- `assigned_to` (foreign key a users)
- `source` (web_form, newsletter, referral, social_media)
- `last_contact_date` (datetime)
- `next_follow_up_date` (datetime)
- `conversion_value` (decimal, valor estimado del proyecto)

### Sistema de Notificaciones Híbrido

#### Telegram Bot Integration
**Configuración:**
- Crear bot via @BotFather → Obtener `TELEGRAM_BOT_TOKEN`
- Definir `TELEGRAM_CHAT_IDS` (array de IDs del equipo)
- Endpoint: `POST /api/admin/notifications/test-telegram`

**Notificaciones automáticas:**
- ✅ Nuevo lead recibido (inmediato, todos los canales)
- ✅ Lead cambia a `urgent` o `high` priority
- ✅ Recordatorio de follow-up pendiente (30 min antes)
- ✅ Resumen diario de actividad (8:00 AM hora local)

#### WhatsApp Business API (Twilio)
**Configuración:**
- Cuenta Twilio + WhatsApp enabled
- Variables: `TWILIO_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_NUMBER`
- Costo: ~$0.005 por mensaje

**Estrategia de uso:**
- Solo para leads `urgent` o `high` priority
- Solo en horario laboral configurable
- Límite máximo: 10 mensajes/día para controlar costos

### Blog Avanzado con Programación

**Funcionalidades:**
- Editor WYSIWYG (Tiptap) en frontend React
- Campo `published_at` nullable:
  - Si es NULL → Borrador
  - Si es fecha futura → Programado (job lo publica)
  - Si es fecha pasada/presente → Publicado inmediatamente
- Estadísticas simples: contador de visitas, última visita
- Versiones/borradores múltiples

### Formulario de Contacto Mejorado

**Campos obligatorios legales:**
```tsx
<Checkbox required label="Acepto la política de privacidad y tratamiento de datos" />
<Checkbox required label="Acepto recibir comunicaciones comerciales y newsletters" />
<Text small>
  Al enviar este formulario, aceptas que tus datos sean almacenados
  para fines de comunicación. Puedes darte de baja en cualquier momento.
</Text>
```

**Doble propósito: BD + Notificación inmediata**
1. Guarda en `contact_messages`
2. Trigger inmediato:
   - Email al equipo (SMTP configurable)
   - Telegram al equipo (gratis)
   - WhatsApp si es urgente (Twilio)

### Sistema Legal - Banner & Políticas

**Banner de Cookies y Privacidad:**
- Aparece al primer load de página
- Visible mínimo 10 segundos con barra de progreso
- Si usuario no interactúa → Aceptación tácita al navegar
- Si acepta/rechaza → Se guarda en localStorage
- Reaparece cada 30 días o si limpia cache

**Páginas legales requeridas:**
- `/privacy-policy` - Política de privacidad completa
- `/terms-of-service` - Términos y condiciones
- `/cookie-policy` - Política de cookies detallada
- `/data-processing` - Tratamiento de datos (GDPR compliant)

**Unsubscribe en emails:**
- Token único por suscriptor
- Endpoint: `GET /api/unsubscribe/{token}`
- Baja inmediata en BD

---

## FEATURE 3: Rediseño Visual y UX ⏳ PENDIENTE

### Landing Pages por Servicio

Cada servicio tendrá landing page única con:
- Color primario y de acento personalizados
- Hero section con animación específica
- Descripción detallada de beneficios
- Casos de éxito relacionados
- FAQ específico del servicio
- Formulario de contacto contextualizado

**Paleta de colores definida:**
| Servicio | Primario | Acento |
|----------|----------|--------|
| Software Development | #3FC1FF | #7C5CFF |
| SaaS Platforms | #22E07C | #14B8A6 |
| Enterprise Solutions | #FF7A1A | #FF3D71 |
| AI & Automation | #36E0C0 | #3F9BFF |
| Modernization | #FFB020 | #FF7A1A |
| UX Engineering | #B66BFF | #FF6BD6 |

### Auditoría Responsive

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch targets ≥ 44px
- Test en dispositivos reales y emuladores

---

## FEATURE 4: Integración y Deploy ⏳ PENDIENTE

### Endpoints API REST

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/health` | Health check | ❌ |
| GET | `/api/services` | Listar servicios activos | ❌ |
| GET | `/api/services/{slug}` | Detalle de servicio con tipos | ❌ |
| GET | `/api/application-types` | Tipos de aplicación (filtro opcional) | ❌ |
| GET | `/api/contact-info` | Información de contacto | ❌ |
| GET | `/api/locations` | Ubicaciones jerárquicas | ❌ |
| GET | `/api/blog/posts` | Posts publicados (paginación) | ❌ |
| GET | `/api/blog/posts/{slug}` | Post individual | ❌ |
| GET | `/api/blog/categories` | Categorías de blog | ❌ |
| POST | `/api/contact` | Enviar formulario contacto | ❌ |
| POST | `/api/newsletter/subscribe` | Suscribirse a newsletter | ❌ |
| GET | `/api/unsubscribe/{token}` | Darse de baja newsletter | ❌ |
| POST | `/api/auth/login` | Login admin | ❌ |
| GET | `/api/admin/dashboard/stats` | Estadísticas dashboard | ✅ |
| GET | `/api/admin/leads` | Listar leads con filtros | ✅ |
| GET | `/api/admin/leads/{id}` | Detalle lead + historial | ✅ |
| PATCH | `/api/admin/leads/{id}/status` | Cambiar estado lead | ✅ |
| POST | `/api/admin/leads/{id}/note` | Agregar nota al lead | ✅ |
| GET | `/api/admin/leads/stats` | Estadísticas CRM | ✅ |
| POST | `/api/admin/blog` | Crear post (draft/scheduled) | ✅ |
| PUT | `/api/admin/blog/{id}` | Actualizar post | ✅ |
| DELETE | `/api/admin/blog/{id}` | Eliminar post | ✅ |
| POST | `/api/admin/notifications/test-telegram` | Probar Telegram | ✅ |
| POST | `/api/admin/notifications/test-whatsapp` | Probar WhatsApp | ✅ |

### Panel de Administración en React

**Rutas protegidas:**
```
/admin/login              → Login page
/admin/dashboard          → Dashboard con métricas
/admin/leads              → Listado CRM con filtros
/admin/leads/:id          → Detalle lead + notas + historial
/admin/blog               → Gestión de posts
/admin/blog/create        → Editor WYSIWYG nuevo post
/admin/blog/:id/edit      → Editar post existente
/admin/newsletter         → Gestión de suscriptores
/admin/newsletter/campaigns → Campañas programadas
/admin/settings           → Configuración general
/admin/settings/notifications → Config Telegram/WhatsApp
/admin/settings/email     → Config SMTP
/admin/users              → Gestión de admins
```

**Componentes reutilizables:**
- `StatCard` - Tarjetas de métricas
- `DataTable` - Tablas con sorting, paginación, filtros
- `StatusBadge` - Badge de estado del lead
- `PriorityIndicator` - Indicador de prioridad
- `PostEditor` - Editor Tiptap wrapper
- `PublishScheduler` - Selector de fecha de publicación
- `NotificationConfig` - UI de configuración de notificaciones

---

## GUÍA DE VALIDACIÓN ENTRE FASES

### Protocolo para "Siguiente Fase"

Cada vez que se solicite continuar con la siguiente fase, se debe:

1. **Validar fase anterior completa:**
   - Revisar todos los criterios de aceptación
   - Ejecutar tests automatizados si existen
   - Verificar que no hay archivos innecesarios

2. **Verificar que cambios no afectan fases previas:**
   - Ejecutar `npx tsc --noEmit` → Debe retornar 0 errores
   - Ejecutar `npm run build` → Debe completar sin warnings críticos
   - Ejecutar `npm run build:seo` → Debe prerrenderizar todas las rutas

3. **Implementar fase correspondiente:**
   - Seguir orden lógico de implementación
   - Crear solo archivos necesarios
   - Documentar decisiones arquitectónicas

4. **Limpieza post-implementación:**
   - Borrar logs de pruebas temporales
   - Mover archivos de test a directorio excluido en `.gitignore`
   - Verificar que no hay código muerto o comentado innecesario

5. **Commit descriptivo:**
   - Mensaje claro indicando feature implementada
   - Referencia a historias de usuario completadas

---

## CRITERIOS DE ACEPTACIÓN POR FEATURE

### Feature 1 (Correcciones) ✅ COMPLETADO
- [x] `npx tsc --noEmit` retorna 0 errores
- [x] `npm run build` completa sin warnings críticos
- [x] `npm run build:seo` prerrenderiza 22 rutas exitosamente
- [x] Bundle total < 500KB

### Feature 2 (Backend/Admin) ⚠️ EN PROGRESO
**Para considerar completa:**
- [ ] Laravel Lumen instalado y configurado en `/api/`
- [ ] 13 migraciones creadas y ejecutadas correctamente
- [ ] Mini CRM funcional con 7 estados + 4 niveles de prioridad
- [ ] Telegram notifica nuevos leads en < 5 segundos
- [ ] WhatsApp configurado y envía alertas críticas
- [ ] Blog permite programación de fechas futuras
- [ ] Formulario contacto tiene checkboxes legales obligatorios
- [ ] Banner legal visible 10 segundos con aceptación tácita
- [ ] Panel admin en React con todas las vistas definidas
- [ ] 11 endpoints API documentados y testeables
- [ ] Tests PHPUnit pasan al 100%

### Feature 3 (Rediseño) ⏳ PENDIENTE
**Se inicia cuando Feature 2 esté 100%:**
- [ ] 6 landing pages de servicio con colores personalizados
- [ ] Auditoría responsive completada (mobile, tablet, desktop)
- [ ] Performance score > 90 en Lighthouse
- [ ] Banner legal implementado y funcional

### Feature 4 (Integración) ⏳ PENDIENTE
- [ ] Proxy Vite configurado para `/api`
- [ ] Servicios API en React consumen endpoints correctamente
- [ ] Autenticación JWT funciona en rutas protegidas
- [ ] Deploy automatizado configurado
- [ ] Variables de entorno en producción
- [ ] SSL configurado
- [ ] Monitoreo activo

---

## ORDEN DE IMPLEMENTACIÓN RECOMENDADO

| Orden | Fase | Duración Est. | Dependencias |
|-------|------|---------------|--------------|
| 1 | **FASE 1**: Migración Lumen | 2h | Ninguna |
| 2 | **FASE 2**: Mini CRM | 3h | FASE 1 |
| 3 | **FASE 3**: Notificaciones | 2h | FASE 1 |
| 4 | **FASE 4**: Formulario Contacto | 1.5h | FASE 2, 3 |
| 5 | **FASE 5**: Sistema Legal | 1h | Ninguna |
| 6 | **FASE 6**: Blog Avanzado | 2.5h | FASE 1 |
| 7 | **FASE 7**: Panel Admin React | 4h | FASE 2, 3, 6 |
| 8 | **FASE 8**: Integración | 2h | FASE 7 |
| 9 | **FASE 9**: Testing | 2h | Todas anteriores |

**Total estimado:** ~20 horas de desarrollo

---

## ESTRUCTURA DE DIRECTORIOS FINAL

```
/workspace/
├── api/                        # Backend Laravel Lumen
│   ├── app/                    # Código PHP organizado
│   ├── database/migrations/    # Migraciones de BD
│   ├── routes/                 # Rutas API
│   └── public/index.php        # Entry point (farutech.com/api)
├── src/                        # Frontend React
│   ├── pages/
│   │   ├── public/             # Páginas del sitio web
│   │   ├── admin/              # Panel de administración SPA
│   │   └── services/           # Landing pages de servicios
│   ├── components/
│   │   ├── ui/                 # Componentes reutilizables
│   │   ├── layout/             # Layouts principales
│   │   └── admin/              # Componentes específicos admin
│   ├── services/               # Clientes API
│   └── hooks/                  # Custom hooks React
├── database/                   # Scripts SQL standalone (backup)
├── docs/
│   └── features/               # Documentación actualizada
├── dist/                       # Build output (producción)
└── .gitignore                  # Excluye: node_modules, dist, .env, logs/
```

---

## NOTAS IMPORTANTES

### Archivos Temporales y Logs
- Todos los logs de pruebas deben ir a `logs/` (excluido en `.gitignore`)
- Borrar logs después de completar cada fase
- No commitear archivos `.log`, `.tmp`, o directorios `test-output/`

### Mantenibilidad del Código
- Eliminar código comentado innecesario
- Usar nombres descriptivos para variables y funciones
- Documentar decisiones arquitectónicas en este archivo
- Mantener funciones pequeñas (< 50 líneas idealmente)

### Validaciones Obligatorias Post-Implementación
Siempre ejecutar al finalizar cada fase:
```bash
npx tsc --noEmit && echo "✅ TYPECHECK OK" || echo "❌ TYPECHECK FAILED"
npm run build && echo "✅ BUILD OK" || echo "❌ BUILD FAILED"
npm run build:seo && echo "✅ SEO BUILD OK" || echo "❌ SEO BUILD FAILED"
```

---

*Documento actualizado: 2025*  
*Versión: 2.0 (Migración a Laravel Lumen + Mini CRM + Notificaciones)*  
*Próxima revisión: Al completar Feature 2*
