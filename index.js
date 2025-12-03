const express = require('express');
require('dotenv').config();

// Importar middlewares
const logger = require('./middlewares/logger.middleware');

// Importar controladores
const {
    obtenerJoyas,
    obtenerJoyasPorFiltros,
    obtenerJoyaPorId
} = require('./controllers/joyas.controller');

// Importar utilidades
const prepararHATEOAS = require('./utils/hateoas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.json());

/**
 * RUTA 1: GET /joyas
 * Cumple con requerimiento 1: Estructura HATEOAS con paginación, límites y ordenamiento
 * Incluye try-catch (requerimiento 4)
 * Incluye middleware de logging (requerimiento 3)
 */
app.get('/joyas', logger, async (req, res) => {
    try {
        // Obtener query strings con valores por defecto
        const queryStrings = req.query;
        
        // Obtener las joyas de la base de datos
        const joyas = await obtenerJoyas(queryStrings);
        
        // Preparar respuesta en formato HATEOAS
        const resultado = prepararHATEOAS(joyas);
        
        res.json(resultado);
    } catch (error) {
        console.error('❌ Error en GET /joyas:', error.message);
        res.status(500).json({
            error: 'Error al obtener las joyas',
            details: error.message
        });
    }
});

/**
 * RUTA 2: GET /joyas/filtros
 * Cumple con requerimiento 2: Filtros por precio_max, precio_min, categoria, metal
 * Cumple con requerimiento 5: Consultas parametrizadas para evitar SQL Injection
 * Incluye try-catch (requerimiento 4)
 * Incluye middleware de logging (requerimiento 3)
 */
app.get('/joyas/filtros', logger, async (req, res) => {
    try {
        const queryStrings = req.query;
        
        // Obtener joyas filtradas
        const joyas = await obtenerJoyasPorFiltros(queryStrings);
        
        res.json(joyas);
    } catch (error) {
        console.error('❌ Error en GET /joyas/filtros:', error.message);
        res.status(500).json({
            error: 'Error al filtrar las joyas',
            details: error.message
        });
    }
});

/**
 * RUTA ADICIONAL: GET /joyas/joya/:id
 * Endpoint adicional para completar la estructura HATEOAS
 * Los links en HATEOAS apuntan a esta ruta
 */
app.get('/joyas/joya/:id', logger, async (req, res) => {
    try {
        const { id } = req.params;
        
        const joya = await obtenerJoyaPorId(id);
        
        if (!joya) {
            return res.status(404).json({
                error: 'Joya no encontrada',
                id: id
            });
        }
        
        res.json(joya);
    } catch (error) {
        console.error('❌ Error en GET /joyas/joya/:id:', error.message);
        res.status(500).json({
            error: 'Error al obtener la joya',
            details: error.message
        });
    }
});

/**
 * RUTA RAÍZ: Información de la API
 */
app.get('/', (req, res) => {
    res.json({
        message: '🏪 API REST - Tienda de Joyas My Precious Spa',
        version: '1.0.0',
        endpoints: {
            joyas: {
                url: '/joyas',
                method: 'GET',
                description: 'Obtener joyas con estructura HATEOAS',
                params: {
                    limits: 'Límite de registros por página (default: 10)',
                    page: 'Número de página (default: 1)',
                    order_by: 'Ordenamiento (ej: stock_ASC, precio_DESC)'
                }
            },
            filtros: {
                url: '/joyas/filtros',
                method: 'GET',
                description: 'Filtrar joyas por diversos criterios',
                params: {
                    precio_max: 'Precio máximo',
                    precio_min: 'Precio mínimo',
                    categoria: 'Categoría (collar, aros, anillo)',
                    metal: 'Metal (oro, plata)'
                }
            },
            joyaEspecifica: {
                url: '/joyas/joya/:id',
                method: 'GET',
                description: 'Obtener una joya específica por ID'
            }
        }
    });
});

/**
 * Manejo de rutas no encontradas
 */
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        ruta: req.originalUrl
    });
});

/**
 * Iniciar el servidor
 */
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(80));
    console.log('🚀 Servidor corriendo en: http://localhost:' + PORT);
    console.log('📚 Documentación disponible en: http://localhost:' + PORT);
    console.log('='.repeat(80) + '\n');
});
