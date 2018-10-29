const express = require('express');
const baseApi = require('./base');
const userApi = require('./user');
const app = express();

app.use(baseApi);
app.use(userApi);


module.exports = app;