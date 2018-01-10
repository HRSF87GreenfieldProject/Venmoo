// import dotenv from 'dotenv';
const path = require('path');
const pg = require('pg');
const express = require('express');
const dotenv = require('dotenv');

const db = require('./../database/index.js');


dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
// const indexPath = path.join(__dirname, '../index.html');

app.get('/db', (request, response) => {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', (err, result) => {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else {
        response.statusCode = 200;
        response.send(JSON.stringify({results: result.rows}));
       };
    });
  });
});




// app.get('/', (request, response) => {
//   res.send({'yo'})
// });

if (!module.parent) {
  app.listen(PORT)
  console.log(`Listening on ${PORT}`);
}


module.exports.app = app;
