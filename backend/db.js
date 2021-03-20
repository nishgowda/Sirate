const { Client } = require('pg');
require('dotenv').config()

const client = new Client({
    connectionString: process.env.connection_string
});

client.connect();

module.exports = client;