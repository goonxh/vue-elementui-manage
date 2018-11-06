const express = require('express');
const baseApi = require('./base');
const userApi = require('./user');
const logApi = require('./log');
const uploadApi = require('./upload');
const app = express();

app.use(uploadApi);
app.use(baseApi);
app.use(userApi);
app.use(logApi);

module.exports = app;