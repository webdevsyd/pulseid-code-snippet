/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getOffers, postOfferAttribution } from '../offers-api';
import { useAuthentication } from '../authentication-provider';

import DEFAULT_IMAGE from './default-image.png';

const OffersContext = React.createContext({});

const imageObject = image => ({ id: uuidv4(), src: `${image}?random=${uuidv4()}` });

const OffersProvider = props => {
  const { xApiKey, xApiSecret, externalUserId } = useAuthentication();
  const [offers, setOffers] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasErrorOffers, setHasErrorOffers] = useState(false);
  const [hasErrorOfferAttribution, setHasErrorOfferAttribution] = useState(false);
  const [isFetchingOffers, setIsFetchingOffers] = useState(false);
  const [isSavingOfferAttribution, setIsSavingOfferAttribution] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const fetchOffers = async ({ page = pageNumber } = {}) => {
    if (total === offers.length && offers.length > 0) return;

    try {
      setIsFetchingOffers(true);
      const body = await getOffers({ xApiKey, xApiSecret, page });
      const formattedOffers = body.offers.map(o => ({
        ...o,
        images:
          o.images.length > 0
            ? [...o.images.map(image => imageObject(image)), imageObject(DEFAULT_IMAGE)]
            : [imageObject(DEFAULT_IMAGE), imageObject(DEFAULT_IMAGE), imageObject(DEFAULT_IMAGE)],
      }));
      setOffers([...offers, ...formattedOffers]);
      setTotal(body.totalCount);
      setPageNumber(page);
    } catch (e) {
      setHasErrorOffers(true);
    } finally {
      setIsFetchingOffers(false);
    }
  };

  const saveOfferAttribution = async ({ offerId, action }) => {
    try {
      setIsSavingOfferAttribution(true);
      await postOfferAttribution({ externalUserId, offerId, action, xApiKey, xApiSecret });
      setHasErrorOfferAttribution(false);
    } catch {
      setHasErrorOfferAttribution(true);
    } finally {
      setIsSavingOfferAttribution(false);
    }
  };

  const resetOffer = () => {
    setOffers([]);
    setHasErrorOffers(false);
    setHasErrorOfferAttribution(false);
  };

  useEffect(() => {
    (async () => {
      await fetchOffers();
    })();
  }, []);

  return (
    <OffersContext.Provider
      value={{
        offers,
        isFetchingOffers,
        isSavingOfferAttribution,
        hasErrorOffers,
        hasErrorOfferAttribution,
        pageNumber,
        onFetchOffers: fetchOffers,
        onResetOffers: resetOffer,
        onSaveOfferAttribution: saveOfferAttribution,
      }}
      {...props}
    />
  );
};

export const useOffers = () => React.useContext(OffersContext);

export default OffersProvider;
