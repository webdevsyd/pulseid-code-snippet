import qs from 'query-string';
import axios from 'axios';

const LIMIT = 4;

const PROXY_API_BASE = window.PROXY_API_BASE ? window.PROXY_API_BASE : 'http://localhost:3006';

export const getOffers = async ({ page, offerId, xApiKey, xApiSecret } = {}) => {
  return axios.get(`${PROXY_API_BASE}/api/offer?${qs.stringify({ limit: LIMIT, page, offerId })}`, {
    headers: { 'X-Api-Key': xApiKey, 'X-Api-Secret': xApiSecret },
  });
};

export const getOfferAttributions = ({ externalUserId, xApiKey, xApiSecret }) => {
  return axios.get(`${PROXY_API_BASE}/api/offer/attribution?${qs.stringify({ externalUserId })}`, {
    headers: { 'X-Api-Key': xApiKey, 'X-Api-Secret': xApiSecret },
  });
};

export const postOfferAttribution = async ({
  offerId,
  action,
  externalUserId,
  xApiKey,
  xApiSecret,
}) => {
  await axios.post(
    `${PROXY_API_BASE}/api/offer/activation`,
    // eslint-disable-next-line radix
    { offerId: parseInt(offerId), action, externalUserId: externalUserId.toString() },
    { headers: { 'X-Api-Key': xApiKey, 'X-Api-Secret': xApiSecret } }
  );
};

export default {};
