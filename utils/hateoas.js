/**
 * Función para preparar la respuesta en formato HATEOAS
 * Cumple con el requerimiento 1a: Estructura HATEOAS
 * 
 * @param {Array} joyas - Array de joyas obtenidas de la base de datos
 * @returns {Object} - Objeto con estructura HATEOAS
 */
const prepararHATEOAS = (joyas) => {
    // Crear los links HATEOAS para cada joya
    const results = joyas.map(joya => ({
        name: joya.nombre,
        href: `/joyas/joya/${joya.id}`
    }));

    // Calcular el stock total sumando todos los stocks
    const stockTotal = joyas.reduce((total, joya) => {
        return total + parseInt(joya.stock);
    }, 0);

    // Retornar la estructura HATEOAS completa
    return {
        totalJoyas: joyas.length,
        stockTotal: stockTotal,
        results: results
    };
};

module.exports = prepararHATEOAS;
