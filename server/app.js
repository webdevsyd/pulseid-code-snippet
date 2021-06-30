process.env.NODE_CONFIG_DIR = `${__dirname}/config/`;

const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  middleware: errorMiddleware,
  traceIdMiddleware,
  notFoundErrorRoute,
} = require('@pulse/errors');

const offerRouter = require('./routers/offer');
const generateIndexHTML = require('./generateIndexHtml');

const ignoreFavicon = (req, res, next) => {
  if (req.originalUrl && req.originalUrl.split('/').pop() === 'favicon.ico') {
    res.sendStatus(204);
  }

  next();
};

const app = express();

app.use(cors());

app.use(ignoreFavicon);
app.use(traceIdMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/offer', offerRouter);

app.get('/js/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/', req.params.file));
});

app.get('/css/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/', req.params.file));
});

app.get('/js/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/', req.params.file));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/favicon.ico'));
});

app.get(/.*woff2$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', req.originalUrl));
});

app.get('*', (req, res) => {
  const apiKey = req.headers['x-api-key'] || process.env.API_KEY;
  const apiSecret = req.headers['x-api-secret'] || process.env.API_SECRET;
  const { euid } = req.headers;
  let page = '';

  if (req.originalUrl.includes('story.html')) {
    page = 'story';
  } else if (req.originalUrl.includes('carousel.html')) {
    page = 'carousel';
  }

  res.set({ 'Content-Type': 'text/html' });
  res.set({ 'X-Frame-Options': 'deny' });
  res.status(200).send(generateIndexHTML({ apiKey, apiSecret, euid, page }));
});

app.use(notFoundErrorRoute);
app.use(errorMiddleware);

module.exports = app;
