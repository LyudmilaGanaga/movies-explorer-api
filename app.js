require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');

const { PORT, MONGO_ADDRESS } = require('./utils/config');

const app = express();

app.use(cors);
app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(express.json());

app.use('/api', routes);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);
mongoose.connect(MONGO_ADDRESS);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});
