// const { users, transactions } = require('./dummy-data.js')
const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
  connectionString: process.env.DATABASE_URL+'?ssl=true',
});

client.connect();

const getUser = (id, cb) => {
  client.query(`SELECT * from users WHERE id = ${id};`, (err, res) => {
    if (err) throw err;
    cb(res.rows);
  });
};

module.exports = {
  getUser,
};
