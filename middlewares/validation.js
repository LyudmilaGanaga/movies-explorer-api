const { celebrate, Joi } = require('celebrate');

const regularURL = /^(https?:\/\/)(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/;

// авторизация
const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// регистрация
const validationRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// апдейт пользователя
const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

// публикация фильма
const validationPostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),

    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),

    duration: Joi.number().required(),
    year: Joi.string().required(),
    movieId: Joi.number().required(),

    description: Joi.string().required(),
    image: Joi.string().required().regex(regularURL),
    trailerLink: Joi.string().required().regex(regularURL),
    thumbnail: Joi.string().required().regex(regularURL),
  }),
});

// валидация ID филмьа
const validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validationLogin,
  validationRegistration,
  validationUpdateUser,
  validationPostMovie,
  validationMovieId,
};
