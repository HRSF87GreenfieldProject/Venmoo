// const { users, transactions } = require('./dummy-data.js')
const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

const getUser = (id) => {
  client.query(`SELECT * from users WHERE id = ${id};`, (err, res) => {
    if (err) throw err;
    res.rows.forEach(row => console.log(JSON.stringify(row)));
    client.end();
  });
};

module.exports = {
  getUser,
};
