const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aprendizagem',
  password: 'senai',
  port: '5433',
});

module.exports = pool;