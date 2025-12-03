const pool = require('../db/config');
const format = require('pg-format');

/**
 * Obtener todas las joyas con paginación, ordenamiento y límites
 * Cumple con requerimiento 1b: limits, page, order_by
 */
const obtenerJoyas = async ({ limits = 10, page = 1, order_by = 'id_ASC' }) => {
    try {
        // Separar el campo y la dirección del ordenamiento
        const [campo, direccion] = order_by.split('_');
        
        // Validar que el campo sea válido para evitar SQL injection
        const camposValidos = ['id', 'nombre', 'categoria', 'metal', 'precio', 'stock'];
        if (!camposValidos.includes(campo)) {
            throw new Error(`Campo de ordenamiento inválido: ${campo}`);
        }

        // Validar dirección de ordenamiento
        const direccionValida = ['ASC', 'DESC'].includes(direccion.toUpperCase());
        if (!direccionValida) {
            throw new Error(`Dirección de ordenamiento inválida: ${direccion}`);
        }

        // Calcular el offset para la paginación
        const offset = (page - 1) * limits;

        // Construir la consulta usando pg-format para evitar SQL injection
        const consulta = format(
            'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
            campo,
            direccion.toUpperCase(),
            limits,
            offset
        );

        const { rows } = await pool.query(consulta);
        return rows;
    } catch (error) {
        throw error;
    }
};

/**
 * Obtener joyas filtradas por diversos criterios
 * Cumple con requerimiento 2: Filtros con consultas parametrizadas
 * Cumple con requerimiento 5: Evitar SQL Injection usando consultas parametrizadas
 */
const obtenerJoyasPorFiltros = async ({ precio_max, precio_min, categoria, metal }) => {
    try {
        let filtros = [];
        const values = [];

        // Construir filtros de manera segura usando consultas parametrizadas
        if (precio_max) {
            filtros.push(`precio <= $${values.length + 1}`);
            values.push(precio_max);
        }

        if (precio_min) {
            filtros.push(`precio >= $${values.length + 1}`);
            values.push(precio_min);
        }

        if (categoria) {
            filtros.push(`categoria = $${values.length + 1}`);
            values.push(categoria);
        }

        if (metal) {
            filtros.push(`metal = $${values.length + 1}`);
            values.push(metal);
        }

        // Construir la consulta SQL
        let consulta = 'SELECT * FROM inventario';

        // Agregar cláusula WHERE si hay filtros
        if (filtros.length > 0) {
            consulta += ` WHERE ${filtros.join(' AND ')}`;
        }

        // Ejecutar la consulta con los valores parametrizados
        const { rows } = await pool.query(consulta, values);
        return rows;
    } catch (error) {
        throw error;
    }
};

/**
 * Obtener una joya específica por ID
 * Endpoint adicional para completar la estructura HATEOAS
 */
const obtenerJoyaPorId = async (id) => {
    try {
        const consulta = 'SELECT * FROM inventario WHERE id = $1';
        const { rows } = await pool.query(consulta, [id]);
        
        if (rows.length === 0) {
            return null;
        }
        
        return rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    obtenerJoyas,
    obtenerJoyasPorFiltros,
    obtenerJoyaPorId
};
