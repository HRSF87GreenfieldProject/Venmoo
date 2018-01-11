const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: `${process.env.DATABASE_URL}?ssl=true`,
  ssl: true
});

client.connect();

const getTransactionHistory = function (userName) {
  const queryString = `SELECT transactions.amount, transactions.status, transactions.type,
  transactions.created_timestamp, transactions.resolved_timestamp, transactions.description
  FROM transactions, users
  WHERE (transactions.sender_id=users.id AND users.name='${userName}')
  OR (transactions.receiver_id=users.id AND users.name='${userName}')`;

  return client.query(queryString);
};

const getUser = (id, cb) => {
  client.query(`SELECT * from users WHERE id = ${id};`, (err, res) => {
    if (err) throw err;
    cb(res.rows);
  });
};

module.exports = {
  getUser,
  getTransactionHistory,
};
