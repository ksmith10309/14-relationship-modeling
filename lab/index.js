'use strict';

require('dotenv').config();
require('babel-register');

// Start the database server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URI, options);

// Start the web server
require('./src/app.js').start(process.env.PORT);
