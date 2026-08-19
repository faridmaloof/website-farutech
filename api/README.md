# FaruTech API - Backend PHP

API RESTful para gestión de leads y suscripciones a newsletter, implementada con PHP siguiendo principios SOLID.

## 📁 Estructura del Proyecto

```
api/
├── config/
│   └── Database.php          # Singleton de conexión a BD
├── src/
│   ├── LeadRepository.php    # Capa de acceso a datos
│   ├── LeadService.php       # Lógica de negocio y validación
│   └── Response.php          # Utilitario de respuestas JSON
├── index.php                 # Router principal (entry point)
├── .htaccess                 # Configuración Apache y seguridad
└── README.md                 # Este archivo
```

## 🚀 Endpoints

### POST `/api/contact`
Envía un formulario de contacto.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@empresa.com",
  "phone": "+57 300 123 4567",
  "company": "Mi Empresa SAS",
  "position": "CEO",
  "service_interest": "desarrollo-software",
  "budget_range": "5000-10000",
  "project_timeline": "1-3_months",
  "message": "Necesito un sistema de gestión..."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "lead_id": 123,
  "lead_score": 85,
  "lead_quality": "hot",
  "message": "Thank you! We will contact you soon."
}
```

### POST `/api/newsletter`
Suscribe un email al newsletter.

**Request Body:**
```json
{
  "email": "usuario@email.com",
  "source": "website"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "subscriber_id": 456,
  "message": "Successfully subscribed to our newsletter!"
}
```

### GET `/api/health`
Verifica el estado de la API.

**Response (200 OK):**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00-05:00",
  "version": "1.0.0"
}
```

## 🗄️ Configuración de Base de Datos

### Variables de Entorno

Configura las siguientes variables en tu servidor:

```bash
DB_HOST=localhost
DB_NAME=farutech_db
DB_USER=tu_usuario
DB_PASS=tu_contraseña
```

O edita los valores por defecto en `config/Database.php`.

### Instalación de la Base de Datos

1. Ejecuta el script SQL:
```bash
mysql -u root -p < database/schema.sql
```

2. O importa manualmente el archivo `database/schema.sql` desde phpMyAdmin o tu cliente MySQL favorito.

## 🔒 Seguridad

- Prepared statements para prevenir SQL injection
- Sanitización de todas las entradas
- Validación de emails y teléfonos
- CORS configurado para dominios específicos
- Headers de seguridad HTTP
- Logs de errores sin exposición al usuario

## 📊 Lead Scoring Automático

El sistema calcula automáticamente una puntuación (0-100) basada en:

| Factor | Puntos |
|--------|--------|
| Campos requeridos completados | +40 |
| Teléfono proporcionado | +10 |
| Empresa proporcionada | +10 |
| Cargo proporcionado | +5 |
| Rango de presupuesto | +15 a +25 |
| Timeline definido | +10 a +20 |
| Mensaje detallado (>200 chars) | +10 |

**Calificación del Lead:**
- **Hot**: 80-100 puntos (alta prioridad)
- **Warm**: 60-79 puntos (seguimiento medio)
- **Cold**: 40-59 puntos (seguimiento bajo)
- **Unqualified**: <40 puntos (no calificado)

## 🛠️ Principios SOLID Aplicados

1. **Single Responsibility Principle (SRP)**
   - `Database.php`: Solo maneja conexiones
   - `LeadRepository.php`: Solo operaciones de BD
   - `LeadService.php`: Solo lógica de negocio
   - `Response.php`: Solo formateo de respuestas

2. **Open/Closed Principle (OCP)**
   - Fácil extensión de validaciones sin modificar código existente

3. **Dependency Inversion Principle (DIP)**
   - `LeadService` depende de abstracción (`LeadRepository`)

## 🧪 Testing

### Probar endpoint de contacto:
```bash
curl -X POST http://localhost/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service_interest": "desarrollo-software",
    "message": "Mensaje de prueba para validar el endpoint"
  }'
```

### Probar endpoint de newsletter:
```bash
curl -X POST http://localhost/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "subscriber@example.com"
  }'
```

### Probar health check:
```bash
curl http://localhost/api/health
```

## 📝 Notas de Implementación

- La API está diseñada para ser llamada desde el frontend vía fetch/XHR
- Nunca expongas credenciales de BD en el código del frontend
- El lead scoring se calcula automáticamente en el trigger de MySQL
- Todos los logs de actividad quedan registrados en `lead_activity_log`

## 🔄 Integración con Frontend

Los componentes React ya están configurados para llamar a esta API:

- `src/components/ContactForm.tsx` → `/api/contact`
- `src/components/Newsletter.tsx` → `/api/newsletter`

Solo asegúrate de que el backend PHP esté desplegado en la ruta `/api` del mismo dominio o configura CORS apropiadamente.

## 📞 Soporte

Para problemas o preguntas, contactar a: desarrollo@farutech.com
