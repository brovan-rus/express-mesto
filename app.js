const port = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const cardRoutes = require('./routes/card');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '60c7a640dcd9901f383c3453',
  };
  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

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
  .catch((err) => console.error(err));
