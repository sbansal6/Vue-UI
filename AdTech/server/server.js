require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

if (process.env.NODE_ENV === 'development') {
  require('../webpack-dev-middleware').init(app);
}

if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, 'dist')));
}

app.use('/public', express.static(path.join(__dirname, 'public')));

let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
app.get('/', function(req, res) {
  res.send(template);
});

app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require('open')(`http://localhost:${process.env.PORT}`);
  }
});
