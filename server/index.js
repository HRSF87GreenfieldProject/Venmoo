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


// `select * from transactions where id = (select last_value from transactions_id_seq);`

app.post('/payment', (req, res) => {
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
        .catch(() => console.error())
    })
    .then(() => {
      res.statusCode = 201;
      res.end();
    })
    .catch(() => { console.error(); });
});


// if user is in database
// find user's balance, and update accordingly

app.post('/request', (req, res) => {
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
        .catch((error) => { throw error; });
    })
    .catch((error) => { throw error; });
});


app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id)) || Number(id) % 1 !== 0) {
    res.status(404).send('invalid user id, should be a postive integer');
  } else {
    db.getUser(id, (data) => {
      if (data.length === 0) {
        res.status(404);
        res.send('no user in database with matching id');
      } else {
        res.send(JSON.stringify(data[0]));
      }
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
          res.status(200).json(responseData);
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

app.post('/transaction/accept/:id-:status', (req, res) => {
  const { id, status } = req.params;
  if (isNaN(Number(id)) || Number(id) % 1 !== 0) {
    res.status(404).send('invalid transaction id, should be a postive integer');
  } else if (status !== 'approved' && status !== 'declined') {
    res.status(404).send('invalid status parameter, should be "approved" or "declined"');
  } else {
    db.transactionAccept(id, status, (data) => { res.send(data); });
  }
});



app.get('/user/:id/pending', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id)) || Number(id) % 1 !== 0) {
    res.status(404).send('invalid user id, should be a postive integer');
  } else {
    db.getPending(id, (data) => {
      res.send(JSON.stringify(data));
    });
  }
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id)) || Number(id) % 1 !== 0) {
    res.status(404).send('invalid user id, should be a postive integer');
  } else {
    db.getUser(id, (data) => {
      if (data.length === 0) {
        res.status(404);
        res.send('no user in database with matching id');
      } else {
        res.send(JSON.stringify(data));
      }
    });
  }
});

if (!module.parent) {
  app.listen(PORT);
  console.log(`Listening on ${PORT}`);
}

const checkDatabaseResponse = function (data, res) {
  if (data.length === 0 || data.rows.length === 0) res.sendStatus(404);
};

module.exports.app = app;
