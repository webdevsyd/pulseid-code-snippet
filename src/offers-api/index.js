import qs from 'query-string';
import axios from 'axios';

const LIMIT = 8;

const PROXY_API_BASE = window.PROXY_API_BASE ? window.PROXY_API_BASE : 'http://localhost:3006';

export const getOffers = async ({ page, offerId, apiKey, apiSecret } = {}) => {
  return axios.get(
    `${PROXY_API_BASE}/api/offer?${qs.stringify({
      limit: offerId ? undefined : LIMIT,
      page,
      offerId,
    })}`,
    {
      headers: { 'X-Api-Key': apiKey, 'X-Api-Secret': apiSecret },
    }
  );
};

export const getOfferAttributions = ({ externalUserId, apiKey, apiSecret }) => {
  return axios.get(`${PROXY_API_BASE}/api/offer/attribution?${qs.stringify({ externalUserId })}`, {
    headers: { 'X-Api-Key': apiKey, 'X-Api-Secret': apiSecret },
  });
};

export const postOfferAttribution = async ({
  offerId,
  action,
  externalUserId,
  apiKey,
  apiSecret,
}) => {
  await axios.post(
    `${PROXY_API_BASE}/api/offer/activation`,
    // eslint-disable-next-line radix
    { offerId: parseInt(offerId), action, externalUserId: externalUserId.toString() },
    { headers: { 'X-Api-Key': apiKey, 'X-Api-Secret': apiSecret } }
  );
};

export default {};
