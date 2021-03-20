const { Client } = require('pg');
require('dotenv').config()

const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
});

client.connect();
module.exports = client;