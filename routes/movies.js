const router = require('express').Router();

const {
  validationPostMovie,
  validationMovieId,
} = require('../middlewares/validation');

const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validationPostMovie, postMovie);
router.delete('/:movieId', validationMovieId, deleteMovie);

module.exports = router;
