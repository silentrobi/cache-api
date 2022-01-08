/** Packages */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { handleError } = require('./src/utils/error');
const routerHello = require('./src/routes/routeHello');
const app = express();

/** Middlewares */
app.use(bodyParser.json());

/** Cors options */
const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(morgan('combined'));

/** Api routes */
app.use('/', routerHello);

/** Error handler Middleware */
app.use((error, req, res, next) => handleError(error, res));

module.exports = app;