require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const cors = require('./middlewares/cors');
const { PORT, MONGO_ADDRESS } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(cors);

app.use(requestLogger);

app.use(errors());

app.use('/api/', routes);
app.use(errorLogger);

app.use(errorHandler);
mongoose.connect(MONGO_ADDRESS);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});
