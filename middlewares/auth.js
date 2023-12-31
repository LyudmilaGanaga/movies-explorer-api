const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = {
      _id: new mongoose.Types.ObjectId(payload._id),
    };
    next();
  } catch (err) {
    return next(UnauthorizedError('Необходима авторизация'));
  }
  return false;
};
