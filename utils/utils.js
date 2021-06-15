const handleError = (err, res) => {
  let ERR_CODE = 500;
  let ERR_MESSAGE = 'Произошла ошибка';
  if (err.name === 'CastError') {
    ERR_CODE = 404;
    ERR_MESSAGE = 'Пользователь или карточка не найдены';
  } else if (err.name === 'ValidationError') {
    ERR_CODE = 400;
    ERR_MESSAGE = 'Переданы некорректные данные';
  }
  return res.status(ERR_CODE).send(ERR_MESSAGE);
};

module.exports = { handleError };
