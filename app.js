const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3005 } = process.env;

const app = express();

app.use(express.json());

app.use(usersRouter);
app.use(cardsRouter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`Слушаем ${PORT}`);
});
