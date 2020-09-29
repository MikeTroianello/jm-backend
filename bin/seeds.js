require('dotenv').config();

const mongoose = require('mongoose');
const Challenge = require('../models/Challenge');

const challengeArray = require('./challengeArray');

mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

Challenge.create(challengeArray)
  .then((results) => {
    console.log('SUCCESSSSSSS: ', results);
  })
  .catch((err) => {
    console.log('NO GOOD', err);
  });

// module.exports =
