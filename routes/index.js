const router = require('express').Router();
const auth = require('../middlewares/auth');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { registration, login } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', login);
router.post('/signup', registration);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('NotFoundError'));
});

module.exports = router;
