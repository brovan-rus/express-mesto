require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const userRoutes = require('./routes/user');
const cardRoutes = require('./routes/card');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { validateEmailPasswordRequest } = require('./middlewares/validate');

const port = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', validateEmailPasswordRequest, login);
app.post('/signup', validateEmailPasswordRequest, createUser);
app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(`Произошла ошибка подключения к базе данных ${err}`));

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use((err, req, res, next) => {
  let { errCode = 500, message = 'Ошибка сервера' } = err;
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    errCode = 400;
    message = 'Переданы некорректные данные';
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    errCode = 409;
    message = 'Данные вызывают конфликт';
  }
  res.status(errCode).send({ message });
});

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
