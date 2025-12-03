const { Pool } = require('pg');
require('dotenv').config();

// Configuración del pool de conexiones a PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'joyas',
    port: process.env.DB_PORT || 5432,
    allowExitOnIdle: true
});

// Verificar conexión
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err.message);
    } else {
        console.log('✅ Conexión exitosa a PostgreSQL');
    }
});

module.exports = pool;
