const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const auth = require('./middlewares/auth');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { login, createUser } = require('./controllers/users');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');

const { PORT = 3006 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth, usersRouter);
app.use(auth, cardsRouter);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`Слушаем ${PORT}`);
});
