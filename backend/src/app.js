const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const transferRoutes = require('./routes/transfer.route');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/transfers', transferRoutes);

module.exports = app;