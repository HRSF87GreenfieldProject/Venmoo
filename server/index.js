const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();
const db = require('../database');
const expressRenderJsx = require('express-render-jsx');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json())

app.post('/payment', (req, res) => {
  let {senderObj, username, amount, isPayment, message} = req.body;
  console.log('SENDER: ', senderObj);
  db.getUserByName(username)
    .then((data) => {
      let {id, name} = data.rows[0];
      db.createTransaction(senderObj.id, id, amount, isPayment)
        .then(() => {
          db.getTransactionHistory(senderObj.name)
            .then((data) => {
              let { rows } = data;
              res.statusCode = 201;
              res.send(data);
            })
        })
        .catch(() => { console.error() })

    })
    .catch(() => {
      console.error();
    })
});

// if user is in database
// find user's balance, and update accordingly

app.post('/request', (req, res) => {
  let {username, amount, isPayment, message} = req.body;
  res.statusCode = 201;
  res.send('Success!');
});


app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id)) || Number(id) % 1 !== 0) {
    res.status(404).send('invalid user id, should be a postive integer');
  } else {
    db.getUser(id, (data) => {
      if (data.length === 0) res.status(404);
      res.send(JSON.stringify(data[0]));
    });
  }
});

//comment to make change
const reactRoute = (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));

app.get('/profilepage', reactRoute);

app.get('/login', reactRoute);

app.get('/signup', reactRoute);

app.get('/profilepage/username/:name', (req, res) => {
  const { name } = req.params;

  const responseData = {};

  db.getUserByName(name)
    .then((userData) => {
      checkDatabaseResponse(userData, res);
      responseData.user = userData.rows[0];
      db.getTransactionHistory(name)
        .then((transactionData) => {
          checkDatabaseResponse(transactionData, res);
          responseData.transactions = transactionData.rows;
          res.json(200, responseData);
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

if (!module.parent) {
  app.listen(PORT);
  console.log(`Listening on ${PORT}`);
}

const checkDatabaseResponse = function (data, res) {
  if (data.length === 0 || data.rows.length === 0) res.sendStatus(404);
};

module.exports.app = app;
