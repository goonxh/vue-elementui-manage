const express = require('express');
const baseApi = require('./base');
const userApi = require('./user');
const logApi = require('./log');
const app = express();

app.use(baseApi);
app.use(userApi);
app.use(logApi);

module.exports = app;