const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Load Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

module.exports = app;
