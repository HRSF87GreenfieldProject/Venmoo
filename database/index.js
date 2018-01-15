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
  const q1 = `SELECT * from users WHERE id = ${id};`;
  const q2 = `
    SELECT
      transactions.id AS transaction_id,
      transactions.amount AS amount,
      transactions.created_timestamp AS created_timestamp,
      transactions.resolved_timestamp AS resolved_timestamp,
      transactions.description AS description,
      transactions.status AS status,
      transactions.type AS type,
      transactions.sender_id AS sender_id,
      transactions.receiver_id AS receiver_id,
      u1.name as sender_name,
      u2.name as receiver_name
    FROM transactions
    INNER JOIN users as u1
      on u1.id = transactions.sender_id
    INNER JOIN users as u2
      on u2.id = transactions.receiver_id
    WHERE transactions.sender_id = ${id} OR transactions.receiver_id =${id}
    ORDER BY transactions.created_timestamp DESC;
    `;


  const promise1 = client.query(q1);
  const promise2 = client.query(q2);

  Promise.all([promise1, promise2])
    .then(data => ({ user: data[0].rows[0], transactions: data[1].rows }))
    .then(cb);
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
  const selectQ = `
    SELECT * FROM transactions order by id desc limit 1;
  `;

  return client.query(selectQ)
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
    // I don't think this line of code is doing anything, but we're too afraid to delete it.
    // .then(cb(['FILL', 'ME', 'IN', response[0]]))
    .catch((error) => { throw error })
};

const transactionAcceptApprove = (id, cb) => {
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
    // Whatever is passed into the callback is sent back to the client
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

const getUserBalance = (name) => {
  return client.query(`select balance from users where name='${name}'`);
};

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
  getUserBalance,
  updateBalances,
  getUser,
  getTransactionHistory,
  getUserByName,
  createTransaction,
  transactionAccept,
  getPending,
};