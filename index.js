require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const mediasRouter = require('./src/api/routes/medias');

const app = express();

app.use(express.json());

connectDB();

app.use('/api/v1/medias', mediasRouter);

app.use((req, res) => {
  return res.status(404).json('route not found');
});

app.listen(3000, () => {
  console.log('server connected at http://localhost:3000/');
});
