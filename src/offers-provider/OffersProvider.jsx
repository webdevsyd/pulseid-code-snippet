/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import qs from 'query-string';

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

  const fetchOffers = async ({ page = pageNumber, excludedOfferId } = {}) => {
    let listOffers = [];
    let singleOffer = [];
    if (total === offers.length && offers.length > 0) return;

    try {
      setIsFetchingOffers(true);
      const body = await getOffers({ xApiKey, xApiSecret, page });

      if (body.offers.length > 0) {
        if (excludedOfferId) {
          listOffers = body.offers.filter(o => o.id !== excludedOfferId);
        } else {
          listOffers = body.offers;
        }
      }

      if (excludedOfferId) {
        singleOffer = await getOffers({ xApiKey, xApiSecret, offerId: excludedOfferId });
      }

      if (excludedOfferId && offers.length === 0) {
        listOffers = [...singleOffer.offers, ...listOffers];
      } else if (excludedOfferId && offers.length > 0) {
        listOffers = [...offers, ...singleOffer.offers, ...listOffers];
      } else if (!excludedOfferId && offers.length > 0) {
        listOffers = [...offers, ...listOffers];
      }

      const formattedOffers = listOffers.map(o => ({
        ...o,
        images:
          o.images.length > 0
            ? [...o.images.map(image => imageObject(image)), imageObject(DEFAULT_IMAGE)]
            : [imageObject(DEFAULT_IMAGE), imageObject(DEFAULT_IMAGE), imageObject(DEFAULT_IMAGE)],
      }));

      setOffers(formattedOffers);

      setTotal(excludedOfferId ? body.totalCount : body.totalCount - 1);
      setPageNumber(page);
    } catch (_) {
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
      const urlParams = qs.parse(window.location.search);

      if (urlParams.offer_id) {
        // eslint-disable-next-line radix
        await fetchOffers({ excludedOfferId: parseInt(urlParams.offer_id) });
      } else {
        await fetchOffers();
      }
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
