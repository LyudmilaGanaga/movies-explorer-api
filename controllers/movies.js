const mongoose = require('mongoose');
const Movie = require('../models/movie');

const {
  BadRequest,
  NotFoundError,
  Forbidden,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie
    .find({ owner })
    .populate('owner')
    .then((movies) => res.status(200).send(movies))
    .catch((err) => {
      next(err);
    });
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    })
    .then((movie) => {
      movie
        .populate('owner');
      res
        .status(200)
        .send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie
    .findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Страница по указанному маршруту не найдена');
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      const _id = req.user._id.toString();
      if (owner === _id) {
        Movie.deleteOne(movie)
          .then(() => {
            res.status(200).send({ message: 'ОК' });
          })
          .catch(next);
      } else {
        throw new Forbidden('Доступ запрещён');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
