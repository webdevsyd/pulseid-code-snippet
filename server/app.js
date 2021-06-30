process.env.NODE_CONFIG_DIR = `${__dirname}/config/`;

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

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
}

app.use(traceIdMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/offer', offerRouter);

app.get('*', (req, res) => {
  const apiKey = req.headers['x-api-key'] || process.env.API_KEY;
  const apiSecret = req.headers['x-api-secret'] || process.env.API_SECRET;
  const { euid } = req.headers;
  let page = '';

  if (req.originalUrl.includes('story.html')) {
    page = 'story';
  } else if (req.originalUrl.includes('carouse.html')) {
    page = 'carousel';
  }

  res.set({ 'Content-Type': 'text/html' });
  res.set({ 'X-Frame-Options': 'deny' });
  res.status(200).send(generateIndexHTML({ apiKey, apiSecret, euid, page }));
});

app.use(notFoundErrorRoute);
app.use(errorMiddleware);

module.exports = app;
