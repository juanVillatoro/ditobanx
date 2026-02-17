const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const transferRoutes = require('./routes/transfer.route');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/users', userRoutes);
app.use('/transfers', transferRoutes);

module.exports = app;