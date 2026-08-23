# ==========================================================================
# FaruTech — Inicialización de la base de datos
#
# Este directorio se monta en el contenedor `db` como
# `/docker-entrypoint-initdb.d`. Los archivos .sql se ejecutan UNA SOLA VEZ,
# la primera vez que se crea el volumen `db_data` (base de datos vacía).
# ==========================================================================

| Archivo                     | Contenido                                       |
|-----------------------------|-------------------------------------------------|
| `01-schema.sql`             | Estructura completa de la base de datos         |
| `02-services.sql`           | Seeds de los 6 servicios                        |
| `03-application_types.sql`  | Seeds de los 105 tipos de aplicación            |

> Los archivos se ejecutan en orden alfabético y contra la base de datos
> definida por `MYSQL_DATABASE`.

## ⚠️ Seguridad

`01-schema.sql` inserta un usuario administrador por defecto
(`admin@farutech.com` con password `admin123`). **Cámbialo antes de
desplegar a producción** o elimina esas líneas del schema y crea el usuario
con un seeder propio.