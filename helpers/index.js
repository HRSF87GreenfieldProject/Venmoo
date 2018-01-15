const db = require('./../database/index.js');

const capitalize = function (string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
};

const handleError = function (error) {
  console.log('error! ', error);
  throw error;
};

const databaseRespondsCorrectly = function (data, res) {
  if (data.length === 0 || data.rows.length === 0) {
    res.sendStatus(404);
    return false;
  }
  return true;
};

const idIsInvalid = function (id, res) {
  if (isNaN(Number(id)) || Number(id) % 1 !== 0) {
    res.status(404).send('invalid id, should be a postive integer');
    return true;
  }
  return false;
};

const sendUserAndTransactions = function (req, res, responseCode = 200) {
  const { username } = req.body;
  const responseData = {};

  db.getUserByName(username)
    .then((userData) => {
      if (!databaseRespondsCorrectly(userData, res)) {
        console.log('invalid query');
        return;
      }
      responseData.user = userData.rows[0];
      db.getTransactionHistory(username)
        .then((transactionData) => {
          if (!databaseRespondsCorrectly(transactionData, res)) {
            console.log('invalid query');
            return;
          }
          console.log('sending response');
          responseData.transactions = transactionData.rows;
          res.status(responseCode).json(responseData);
        })
        .catch((error) => { handleError(error); });
    })
    .catch((error) => { handleError(error); });
};

const generatePaymentOrRequest = function (req, res) {
  const {
    senderObj,
    username,
    amount,
    isPayment,
  } = req.body;

  db.getUserByName(username)
    .then((data) => {
      const { id } = data.rows[0];
      db.createTransaction(senderObj.id, id, amount, isPayment)
        .then(db.updateBalances)
        .then(() => {
          res.statusCode = 201;
          res.end();
        })
        .catch((error) => { handleError(error); });
    })
    .catch((error) => { handleError(error); });
};


module.exports = {
  idIsInvalid,
  capitalize,
  databaseRespondsCorrectly,
  sendUserAndTransactions,
  generatePaymentOrRequest,
};
