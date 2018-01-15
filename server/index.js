const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const expressRenderJsx = require('express-render-jsx');
let expressValidator = require('express-validator');

const db = require('../database');
const {
  sendUserAndTransactions,
  idIsInvalid,
  generatePaymentOrRequest,
} = require('./../helpers/index.js');

const PORT = process.env.PORT || 3000;
const app = express();

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.use(new LocalStrategy((username, password, done) => {
  db.getUserByName(username)
    .then((data) => {
      if (data.rows.length && data.rows[0].password === password) {
        return done(null, data.rows[0]);
      }
      console.log('Invalid username/password submitted');
      return done(null, false);
    })
    .catch(err => done(err));
}));

app.use(expressValidator());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.post('/profilepage', passport.authenticate('local'), (req, res) => {
  sendUserAndTransactions(req, res);
});

app.post('/payment', (req, res) => {
  generatePaymentOrRequest(req, res);
});

app.post('/request', (req, res) => {
  generatePaymentOrRequest(req, res);
});

const reactRoute = (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));

app.get('/profile', reactRoute);

app.get('/profilepage', reactRoute);

app.get('/', reactRoute);

app.get('/signup', reactRoute);

app.post('/transaction/accept/:id-:status', (req, res) => {
  const { id, status } = req.params;
  if (idIsInvalid(id, res)) {
    return;
  } else if (status !== 'approved' && status !== 'declined') {
    res.status(404).send('invalid status parameter, should be "approved" or "declined"');
  } else {
    db.transactionAccept(id, status, (data) => { res.send(data); });
  }
});

app.get('/user/:id/pending', (req, res) => {
  const { id } = req.params;
  if (idIsInvalid(id, res)) {
    return;
  }
  db.getPending(id, (data) => {
    res.json(data);
  });
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  if (idIsInvalid(id, res)) {
    return;
  }
  db.getUser(id, data => res.json(data));
});

if (!module.parent) {
  app.listen(PORT);
  console.log(`Listening on ${PORT}`);
}


module.exports.app = app;
