const { Client } = require('pg');

const client = new Client();

client.connect();

const getTransactionHistory = function (userName) {
  const queryString = `SELECT transactions.amount, transactions.status, transactions.type, 
  transactions.created_timestamp, transactions.resolved_timestamp, transactions.description
  FROM transactions, users
  WHERE (transactions.sender_id=users.id AND users.name='${userName}')
<<<<<<< HEAD
  OR (transactions.receiver_id=users.id AND users.name='${userName}')`
=======
  OR (transactions.receiver_id=users.id AND users.name='${userName}')`;
>>>>>>> 55f77715039f4ff7051c01a8b80d7dc4885bfc6b

  client.query(queryString)
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports.getTransactionHistory = getTransactionHistory;

