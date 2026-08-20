# Database Setup Instructions

## Prerequisites
MySQL o MariaDB debe estar instalado y ejecutándose en tu sistema.

## Configuración

### 1. Crear la base de datos
```sql
CREATE DATABASE IF NOT EXISTS farutech_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

### 2. Configurar variables de entorno
Editar el archivo `.env` en `/api/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=farutech_db
DB_USERNAME=root
DB_PASSWORD=tu_password_aqui
```

### 3. Ejecutar migraciones
Desde el directorio `/api`:
```bash
php artisan migrate
```

### 4. Ejecutar seeders (datos iniciales)
```bash
php artisan db:seed
```

O combinar ambos comandos:
```bash
php artisan migrate:fresh --seed
```

## Usuarios por defecto después del seed

| Email | Password | Rol |
|-------|----------|-----|
| admin@farutech.com | Admin@123456 | admin |
| editor@farutech.com | Editor@123456 | editor |
| viewer@farutech.com | Viewer@123456 | viewer |

## Estructura de Migraciones Creadas

1. `users` - Usuarios del sistema (admin, editor, viewer)
2. `services` - Servicios principales (6 servicios)
3. `application_types` - Tipos de aplicación (105 tipos)
4. `locations` - Ubicaciones geográficas (países, estados, ciudades)
5. `leads` - Leads del Mini CRM con estados y prioridades
6. `lead_notes` - Notas e historial de interacciones con leads
7. `blog_categories` - Categorías del blog
8. `blog_posts` - Posts del blog con programación
9. `newsletter_subscribers` - Suscriptores al newsletter
10. `newsletter_campaigns` - Campañas de newsletter
11. `contact_messages` - Mensajes del formulario de contacto
12. `notification_settings` - Configuración de notificaciones
13. `audit_logs` - Logs de auditoría del sistema

## Verificación

Para verificar que las tablas se crearon correctamente:
```sql
USE farutech_db;
SHOW TABLES;
```

Deberías ver 13 tablas creadas.
