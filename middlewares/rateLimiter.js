const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Превышено количество запросов с вашего IP, попробуйте позже.',
});

module.exports = limiter;
