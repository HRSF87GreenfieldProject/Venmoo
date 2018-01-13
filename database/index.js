const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: `${process.env.DATABASE_URL}?ssl=true`,
  ssl: true,
});

client.connect();
//check
const getTransactionHistory = function (userName) {
  const queryString = `
  SELECT
    tab.transaction_id,
    tab.amount,
    tab.status,
    tab.type,
    tab.created_timestamp,
    tab.resolved_timestamp,
    tab.description,
    tab.sender_name,
    users.name AS receiver_name,
    tab.sender_id,
    tab.receiver_id
  FROM
    (SELECT
      transactions.id AS transaction_id,
      transactions.amount,
      transactions.status,
      transactions.type,
      transactions.created_timestamp,
      transactions.resolved_timestamp,
      transactions.description,
      transactions.receiver_id,
      transactions.sender_id,
      users.name AS sender_name
    FROM transactions, users
    WHERE transactions.sender_id = users.id)
    AS tab, users
  WHERE tab.receiver_id=users.id`;

  const specificUserQueryString = `SELECT * FROM (${queryString}) AS data
  WHERE data.sender_name='${userName}' OR data.receiver_name='${userName}'`;

  return client.query(userName ? specificUserQueryString : queryString);
};

const getUser = (id, cb) => {
  client.query(`SELECT * from users WHERE id = ${id};`, (err, res) => {
    if (err) throw err;
    cb(res.rows);
  });
};

const getUserByName = (name) => {
  const queryString = `SELECT * FROM users WHERE name = '${name}'`;
  return client.query(queryString);
};

const createTransaction = (sender_id, receiver_id, amount, isPayment, callback) => {
  let approval = isPayment ? "'approved'" : "'pending'";
  let typeOfTransaction = isPayment ? "'payment'" : "'request'";
  let timeStamp = isPayment ? 'now(), now()' : 'now(), null';
  return client.query(`INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp)
  VALUES(${sender_id},${receiver_id},${amount},${approval},${typeOfTransaction},${timeStamp});`)
};


const updateBalances = () => {
  // change status X
  // change resolved_timestamp X
  // change balance of both users
  const response = ['success'];

  const selectQ = `
    SELECT * FROM transactions order by id desc limit 1;
  `;

  client.query(selectQ)
    .then((res) => {
      const { sender_id, receiver_id, amount, type } = res.rows[0];
      const updateSender = `
        UPDATE users
        SET balance = balance - ${amount.slice(1)}::float8::numeric::money
        WHERE id = ${sender_id};
      `;

      const updateReceiver = `
        UPDATE users
        SET balance = balance + ${amount.slice(1)}::float8::numeric::money
        WHERE id = ${receiver_id};
      `;

      return { updateReceiver, updateSender };
    })
    .then(({ updateReceiver, updateSender }) => {
      client.query(updateSender);
      return updateReceiver;
    })
    .then(updateReceiver => client.query(updateReceiver))
    // .then(cb(['FILL', 'ME', 'IN', response[0]]))
    .catch((error) => { throw error })
};


const transactionAcceptApprove = (id, cb) => {
  // change status X
  // change resolved_timestamp X
  // change balance of both users
  const response = ['success'];
  const updateQ = `
    UPDATE transactions
    SET
      status = 'approved',
      resolved_timestamp = now()
    WHERE id = ${id}
    ;
  `;
  const selectQ = `
    SELECT * FROM transactions WHERE id = ${id};
  `;

  client.query(updateQ)
    .then(() => client.query(selectQ))
    .then((res) => {
      const { sender_id, receiver_id, amount, status } = res.rows[0];

      const updateSender = `
        UPDATE users
        SET balance = balance - ${amount.slice(1)}::float8::numeric::money
        WHERE id = ${sender_id};
      `;

      const updateReceiver = `
        UPDATE users
        SET balance = balance + ${amount.slice(1)}::float8::numeric::money
        WHERE id = ${receiver_id};
      `;

      return { updateReceiver, updateSender };
    })
    .then(({ updateReceiver, updateSender }) => {
      client.query(updateSender);
      return updateReceiver;
    })
    .then(updateReceiver => client.query(updateReceiver))
    .then(cb(['FILL', 'ME', 'IN', response[0]]));
};

const transactionAccept = (id, status, cb) => {
  if (status === 'approved') {
    transactionAcceptApprove(id, cb);
  } else {
    const updateQ = `
      UPDATE transactions
      SET
        status = '${status}',
        resolved_timestamp = now()
      WHERE id = ${id}
      ;
    `;

    client.query(updateQ).then((data) => {
      const response = data.rowCount === 0 ? 'invalid transaction id' : 'success';
      cb([response]);
    });
  }
};

// const getPending = (sender_id, cb) => {
//   const q = `SELECT * FROM transactions WHERE sender_id = ${sender_id}`;
//   client.query(q, (err, res) => {
//     if (err) throw err;
//     console.log(r)
//     cb(res.rows);
//   });
// };

const getPending = (id, cb) => {
  client.query(`
      SELECT * from transactions
      WHERE sender_id = ${id}
      AND status = 'pending';
    `, (err, res) => {
    if (err) throw err;
    cb(res.rows);
  });
};

module.exports = {
  updateBalances,
  getUser,
  getTransactionHistory,
  getUserByName,
  createTransaction,
  transactionAccept,
  getPending,
};
