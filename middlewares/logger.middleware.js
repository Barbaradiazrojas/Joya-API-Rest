/**
 * Middleware para registrar todas las consultas realizadas a la API
 * Cumple con el requerimiento 3: Generar reportes de actividad
 */
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const queryParams = Object.keys(req.query).length > 0 
        ? JSON.stringify(req.query) 
        : 'Sin parámetros';

    console.log('\n' + '='.repeat(80));
    console.log(`📋 REPORTE DE CONSULTA`);
    console.log(`⏰ Timestamp: ${timestamp}`);
    console.log(`🔗 Ruta: ${method} ${url}`);
    console.log(`📊 Parámetros: ${queryParams}`);
    console.log('='.repeat(80) + '\n');

    next();
};

module.exports = logger;
