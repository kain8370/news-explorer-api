require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handlerErrors = require('./errors/handler-errors');

const { NODE_ENV, PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

mongoose.connect(NODE_ENV === 'production' ? process.env.Mongo : 'mongodb://localhost:27017/dev-bd', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());

app.use(cookieParser());
app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
