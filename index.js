require('dotenv').config;
const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res) => {
  return res.status(404).json('route not found');
});

app.listen(3000, () => {
  console.log('server connected at http://localhost:3000/');
});
