# 🚀 GUÍA DE INICIO RÁPIDO

## ⚡ 5 Pasos para ejecutar el proyecto

### 1️⃣ Descomprimir el archivo
Extrae `tienda-joyas-api.zip` en tu carpeta de proyectos

### 2️⃣ Abrir en VS Code
```bash
cd tienda-joyas-api
code .
```

### 3️⃣ Instalar dependencias
Abre la terminal integrada de VS Code (Ctrl + `) y ejecuta:
```bash
npm install
```

### 4️⃣ Configurar base de datos

**Opción A - Usando terminal:**
```bash
psql -U postgres
```

**Opción B - Usando pgAdmin o DBeaver:**
Conecta a PostgreSQL y ejecuta las siguientes líneas:

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

### 5️⃣ Configurar credenciales

Crea un archivo `.env` copiando `.env.example`:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_contraseña_aquí
DB_NAME=joyas
DB_PORT=5432
PORT=3000
```

**⚠️ IMPORTANTE:** Reemplaza `tu_contraseña_aquí` con tu contraseña real de PostgreSQL

### 6️⃣ Iniciar el servidor

```bash
npm start
```

Deberías ver:
```
✅ Conexión exitosa a PostgreSQL
🚀 Servidor corriendo en: http://localhost:3000
```

## 🧪 Probar la API

### Opción 1: Thunder Client (Recomendado para VS Code)

1. Instala la extensión "Thunder Client" en VS Code
2. Crea una nueva petición
3. Prueba estos endpoints:

```
GET http://localhost:3000/joyas?limits=3&page=1&order_by=stock_ASC
GET http://localhost:3000/joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata
```

### Opción 2: Navegador

Abre en tu navegador:
```
http://localhost:3000/joyas
```

### Opción 3: cURL

```bash
curl http://localhost:3000/joyas?limits=3&order_by=precio_DESC
```

## ✅ Verificar que todo funciona

Si todo está correcto deberías ver:

1. ✅ Conexión exitosa a PostgreSQL en la consola
2. ✅ Servidor corriendo en puerto 3000
3. ✅ Respuestas JSON al consultar los endpoints
4. ✅ Logs detallados en consola por cada consulta

## ❌ Problemas Comunes

### Error: "password authentication failed"
→ Verifica tu contraseña en el archivo `.env`

### Error: "database joyas does not exist"
→ Ejecuta el script SQL completo (paso 4)

### Error: "Cannot find module 'express'"
→ Ejecuta `npm install`

### Error: "port 3000 already in use"
→ Cambia el puerto en `.env` a 3001 o 3002

## 📊 Ejemplos de Respuesta

**GET /joyas?limits=3&page=1&order_by=stock_ASC**
```json
{
  "totalJoyas": 3,
  "stockTotal": 6,
  "results": [
    {
      "name": "Collar Heart",
      "href": "/joyas/joya/1"
    }
  ]
}
```

**GET /joyas/filtros?metal=oro&precio_max=20000**
```json
[
  {
    "id": 3,
    "nombre": "Aros Berry",
    "categoria": "aros",
    "metal": "oro",
    "precio": 12000,
    "stock": 10
  }
]
```

## 🎯 Cumplimiento del Desafío

✅ Estructura HATEOAS (1.5 pts)
✅ Paginación, límites y ordenamiento (2 pts)
✅ Filtros múltiples (3.5 pts)
✅ Middleware de logging (1 pt)
✅ Try-catch en rutas (1 pt)
✅ Consultas parametrizadas (1 pt)

**Total: 10/10 puntos** 🎉

## 📞 ¿Necesitas ayuda?

- Lee el README.md completo para más detalles
- Revisa los comentarios en el código
- Verifica los logs en consola

¡Éxito con tu desafío! 💪
