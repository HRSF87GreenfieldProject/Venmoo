// import dotenv from 'dotenv';
const path = require('path');
const express = require('express');
require('dotenv').config();
const db = require('../database');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id)) || Number(id) % 1 !== 0) {
    res.status(404).send('invalid user id, should be a postive integer')
  } else {
    db.getUser(id, (data) => {
      if (data.length === 0) res.status(404);
      res.send(JSON.stringify(data[0]));
    });
  }
});


if (!module.parent) {
  app.listen(PORT);
  console.log(`Listening on ${PORT}`);
}


module.exports.app = app;
