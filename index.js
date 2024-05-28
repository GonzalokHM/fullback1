const express = require('express');
require('dotenv').config();
const { connectDB } = require('./src/config/db');
const { setError } = require('./src/config/error');
const indexRouter = require('./src/api/routes/indexRouter');
const cors = require("cors");

const app = express();

connectDB();


app.use(cors());
app.use(express.json())

app.use('/api', indexRouter);

app.use('*', (req, res, next) => {
  return next(setError(404, 'Not found'));
});

//controlador errores generales de servidor
app.use((error, req, res, next) => {
  console.error(error);
  return res
    .status(error.status || 500)
    .json(error.message || 'Internal server Error');
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`escuchando en: http//:localhost:${PORT}`);
});
