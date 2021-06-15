class PropertyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PropertyError';
  }
}
const handleError = (err, res) => {
  let ERR_CODE = 500;
  let ERR_MESSAGE = 'Произошла ошибка';
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    ERR_CODE = 400;
    ERR_MESSAGE = 'Переданы некорректные данные';
  } else if (err.name === 'PropertyError') {
    ERR_CODE = 404;
    ERR_MESSAGE = err.message;
  }
  return res.status(ERR_CODE).send({ message: ERR_MESSAGE });
};

module.exports = { handleError, PropertyError };
