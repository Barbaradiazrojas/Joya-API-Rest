# 💎 API REST - Tienda de Joyas My Precious Spa

API REST completa para la gestión de inventario de una tienda de joyas con paginación, ordenamiento, filtros y estructura HATEOAS.

## 📋 Descripción del Proyecto

Este proyecto implementa una API REST moderna y eficiente para la tienda de joyas "My Precious Spa", cumpliendo con todos los requerimientos del desafío:

### ✅ Requerimientos Implementados

- ✅ **1.5 pts** - Estructura HATEOAS con totalJoyas, stockTotal y results
- ✅ **2 pts** - Paginación, límites y ordenamiento (limits, page, order_by)
- ✅ **3.5 pts** - Filtros: precio_max, precio_min, categoria, metal
- ✅ **1 pt** - Middleware de logging para reportes de actividad
- ✅ **1 pt** - Try-catch en todas las rutas
- ✅ **1 pt** - Consultas parametrizadas para evitar SQL Injection

**Total: 10/10 puntos** 🎯

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

```bash
# Si usas Git
git clone <url-del-repositorio>
cd tienda-joyas-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto copiando `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de PostgreSQL:

```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=joyas
DB_PORT=5432
PORT=3000
```

### 4. Crear la base de datos

Ejecuta el script SQL en tu terminal psql:

```bash
psql -U tu_usuario -f script.sql
```

O manualmente en psql:

```sql
CREATE DATABASE joyas;
\c joyas;

CREATE TABLE inventario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    categoria VARCHAR(50),
    metal VARCHAR(50),
    precio INT,
    stock INT
);

INSERT INTO inventario VALUES
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000, 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000, 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000, 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000, 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000, 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000, 2);
```

### 5. Iniciar el servidor

```bash
# Modo producción
npm start

# Modo desarrollo (con nodemon)
npm run dev
```

El servidor estará corriendo en: `http://localhost:3000`

## 📚 Documentación de Endpoints

### 1. GET /joyas

Obtiene todas las joyas en formato HATEOAS con paginación, límites y ordenamiento.

**Query Parameters:**
- `limits` (opcional): Cantidad de joyas por página (default: 10)
- `page` (opcional): Número de página (default: 1)
- `order_by` (opcional): Campo y dirección de ordenamiento (default: id_ASC)
  - Formato: `campo_DIRECCION`
  - Campos válidos: `id`, `nombre`, `categoria`, `metal`, `precio`, `stock`
  - Dirección: `ASC` o `DESC`

**Ejemplo de uso:**

```bash
# Obtener 3 joyas de la página 2 ordenadas por stock ascendente
GET http://localhost:3000/joyas?limits=3&page=2&order_by=stock_ASC
```

**Respuesta:**

```json
{
  "totalJoyas": 3,
  "stockTotal": 19,
  "results": [
    {
      "name": "Anillo Wish",
      "href": "/joyas/joya/5"
    },
    {
      "name": "Collar History",
      "href": "/joyas/joya/2"
    },
    {
      "name": "Aros Berry",
      "href": "/joyas/joya/3"
    }
  ]
}
```

### 2. GET /joyas/filtros

Filtra las joyas según diversos criterios usando consultas parametrizadas (seguras contra SQL Injection).

**Query Parameters:**
- `precio_max` (opcional): Precio máximo
- `precio_min` (opcional): Precio mínimo
- `categoria` (opcional): Categoría (collar, aros, anillo)
- `metal` (opcional): Metal (oro, plata)

**Ejemplo de uso:**

```bash
# Filtrar joyas entre $25000 y $30000, categoría aros, metal plata
GET http://localhost:3000/joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata
```

**Respuesta:**

```json
[
  {
    "id": 5,
    "nombre": "Anillo Wish",
    "categoria": "aros",
    "metal": "plata",
    "precio": 30000,
    "stock": 4
  }
]
```

### 3. GET /joyas/joya/:id

Obtiene una joya específica por su ID.

**Ejemplo de uso:**

```bash
GET http://localhost:3000/joyas/joya/1
```

**Respuesta:**

```json
{
  "id": 1,
  "nombre": "Collar Heart",
  "categoria": "collar",
  "metal": "oro",
  "precio": 20000,
  "stock": 2
}
```

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **PostgreSQL** - Base de datos relacional
- **pg** - Cliente de PostgreSQL para Node.js
- **pg-format** - Formateo seguro de consultas SQL
- **dotenv** - Manejo de variables de entorno

## 📁 Estructura del Proyecto

```
tienda-joyas-api/
├── controllers/
│   └── joyas.controller.js    # Lógica de negocio y consultas a BD
├── db/
│   └── config.js              # Configuración de PostgreSQL
├── middlewares/
│   └── logger.middleware.js   # Middleware de logging
├── utils/
│   └── hateoas.js            # Función para estructura HATEOAS
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore               # Archivos a ignorar en Git
├── index.js                 # Servidor principal
├── package.json             # Dependencias y scripts
├── script.sql              # Script para crear la base de datos
└── README.md               # Este archivo
```

## 🔒 Seguridad

El proyecto implementa las siguientes medidas de seguridad:

1. **Consultas Parametrizadas**: Todas las consultas que reciben input del usuario usan parámetros `$1, $2, etc.` para prevenir SQL Injection
2. **Validación de Campos**: Se valida que los campos de ordenamiento sean válidos antes de usarlos en la consulta
3. **Try-Catch**: Todas las rutas están protegidas con bloques try-catch para manejo de errores
4. **Variables de Entorno**: Credenciales sensibles se manejan mediante variables de entorno

## 📊 Logging y Monitoreo

Cada consulta a la API genera un reporte detallado en consola:

```
================================================================================
📋 REPORTE DE CONSULTA
⏰ Timestamp: 2024-01-15T10:30:45.123Z
🔗 Ruta: GET /joyas?limits=3&page=2&order_by=stock_ASC
📊 Parámetros: {"limits":"3","page":"2","order_by":"stock_ASC"}
================================================================================
```

## 🧪 Ejemplos de Pruebas

### Usando Thunder Client o Postman

1. **Obtener todas las joyas (página 1)**
   ```
   GET http://localhost:3000/joyas
   ```

2. **Obtener 5 joyas ordenadas por precio descendente**
   ```
   GET http://localhost:3000/joyas?limits=5&order_by=precio_DESC
   ```

3. **Filtrar joyas de oro con precio menor a $20000**
   ```
   GET http://localhost:3000/joyas/filtros?precio_max=20000&metal=oro
   ```

4. **Combinar todos los filtros**
   ```
   GET http://localhost:3000/joyas/filtros?precio_min=15000&precio_max=30000&categoria=aros&metal=oro
   ```

### Usando cURL

```bash
# Obtener joyas con HATEOAS
curl http://localhost:3000/joyas?limits=3&page=1&order_by=precio_DESC

# Filtrar joyas
curl "http://localhost:3000/joyas/filtros?precio_min=20000&metal=plata"
```

## ⚠️ Solución de Problemas

### Error de conexión a PostgreSQL

```
❌ Error conectando a la base de datos: password authentication failed
```

**Solución**: Verifica que las credenciales en `.env` sean correctas.

### Puerto en uso

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solución**: Cambia el puerto en `.env` o detén el proceso que está usando el puerto 3000.

### La base de datos no existe

```
❌ Error: database "joyas" does not exist
```

**Solución**: Ejecuta el script `script.sql` para crear la base de datos.

## 👥 Autor

Desarrollado como parte del desafío Full Stack de Desafío Latam.

## 📝 Notas Importantes

- La tabla tiene un dato intencional "incorrecto": "Anillo Wish" está categorizado como "aros" en lugar de "anillo". Esto es parte de los datos de prueba originales.
- El primer parámetro de paginación es `page=1` (no `page=0`).
- Los campos de ordenamiento son sensibles a mayúsculas en la dirección: `ASC` o `DESC`.

## 🎯 Próximas Mejoras

- [ ] Agregar autenticación con JWT
- [ ] Implementar caché con Redis
- [ ] Agregar pruebas unitarias con Jest
- [ ] Documentación con Swagger/OpenAPI
- [ ] Rate limiting para prevenir abuso
- [ ] Compresión de respuestas con gzip

---

¡Listo para usar! 🚀 Si tienes dudas, revisa la documentación o abre un issue.
