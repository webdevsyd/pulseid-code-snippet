/* eslint import/newline-after-import: "off" */
const router = require('express').Router();
const config = require('config');
const { asyncHandler, BaseError } = require('@pulse/errors');
const call = require('@pulse/proxy-request/call')(BaseError, 'Code-Snippet');
const queryString = require('@pulse/proxy-request/queryString');

const externalOfferApiUrl = config.get('urls.externalOfferApi');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const {
      query: { limit, page, offerId },
    } = req;

    res.status(200).send(
      await call({
        url: `${externalOfferApiUrl}/offer?${queryString({
          limit,
          page,
          offerId,
        })}`,
        headers: {
          'X-Api-Key': req.headers['x-api-key'],
          'X-Api-Secret': req.headers['x-api-secret'],
        },
      })
    );
  })
);

router.post(
  '/activation',
  asyncHandler(async (req, res) => {
    const {
      body: { offerId, action, externalUserId },
    } = req;

    res.status(201).send(
      await call({
        url: `${externalOfferApiUrl}/offer/activation`,
        method: 'POST',
        body: {
          offerId: offerId || undefined,
          action: action || undefined,
          externalUserId: externalUserId || undefined,
        },
        headers: {
          'X-Api-Key': req.headers['x-api-key'],
          'X-Api-Secret': req.headers['x-api-secret'],
        },
      })
    );
  })
);

module.exports = router;
