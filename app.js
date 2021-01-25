const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DEV_DB } = require('./utils/config');

const { PORT = 3000, NEWS_EXPLORER_DB, NODE_ENV = 'develop' } = process.env;

const app = express();
app.use(helmet());
app.use(cors());

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());

mongoose.connect(NODE_ENV === 'production' ? NEWS_EXPLORER_DB : DEV_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);
