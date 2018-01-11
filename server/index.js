// import dotenv from 'dotenv';
const path = require('path');
const pg = require('pg');
const express = require('express');
require('dotenv').config();
const db = require('../database');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/user/:id', (req, res) => {
  db.getUser(req.params.id);
  res.end();
});


if (!module.parent) {
  app.listen(PORT)
  console.log(`Listening on ${PORT}`);
}


module.exports.app = app;
