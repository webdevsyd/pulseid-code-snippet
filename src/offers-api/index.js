import qs from 'query-string';
import axios from 'axios';

const LIMIT = 4;

export const getOffers = async ({ page, xApiKey, xApiSecret } = {}) => {
  console.log(process.env.PROXY_API_BASE);
  const response = await fetch(
    `${process.env.PROXY_API_BASE}/api/offer?${qs.stringify({ limit: LIMIT, page })}`,
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
  console.log(process.env.PROXY_API_BASE);

  await axios.post(
    `${process.env.PROXY_API_BASE}/api/offer/activation`,
    { offerId, action, externalUserId: externalUserId.toString() },
    { headers: { 'X-Api-Key': xApiKey, 'X-Api-Secret': xApiSecret } }
  );
};

export default {};
