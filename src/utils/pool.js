const {Pool} = require('pg');
require('dotenv').config({path:'../../../.env'})

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '12345',
    database: 'Project',
    port: '5432',
    max: 10,
    min: 1
})

module.exports = pool;