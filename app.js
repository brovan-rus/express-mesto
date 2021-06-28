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

const port = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', login);
app.post('/signup/', createUser);
app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use((req, res) => {
  res.status(500).send({ message: 'Ошибка сервера' });
});

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(`Произошла ошибка подключения к базе данных ${err}`));
