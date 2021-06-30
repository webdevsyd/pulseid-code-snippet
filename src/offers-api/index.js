import qs from 'query-string';
import axios from 'axios';

const LIMIT = 4;

const PROXY_API_BASE = window.PROXY_API_BASE ? window.PROXY_API_BASE : process.env.PROXY_API_BASE;

export const getOffers = async ({ page, xApiKey, xApiSecret } = {}) => {
  const response = await fetch(
    `${PROXY_API_BASE}/api/offer?${qs.stringify({ limit: LIMIT, page })}`,
    {
      method: 'GET',
      headers: {
        'X-Api-Key': xApiKey,
        'X-Api-Secret': xApiSecret,
      },
    }
  );
  const body = await response.json();

  return body;
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
    { offerId, action, externalUserId: externalUserId.toString() },
    { headers: { 'X-Api-Key': xApiKey, 'X-Api-Secret': xApiSecret } }
  );
};

export default {};
