/* eslint-disable radix */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { uniqBy, prop } from 'ramda';

import { ERROR_CODE } from '../errorCode';
import { getOffers, getOfferAttributions, postOfferAttribution } from '../offers-api';
import { useAuthentication } from '../authentication-provider';

import DEFAULT_IMAGE from './default-image.png';

const OffersContext = React.createContext({});

const imageObject = image => ({ id: uuidv4(), src: `${image}?random=${uuidv4()}` });

const OffersProvider = props => {
  const { xApiKey, xApiSecret, externalUserId } = useAuthentication();
  const [offers, setOffers] = useState([]);
  const [enrolledOffers, setEnrolledOffers] = useState([]);
  const [viewedOffers, setViewedOffers] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const [isShowEnrolledPopup, setIsShowEnrolledPopup] = useState(false);
  const [isFetchingInitialOffer, setIsFetchingInitialOffer] = useState(false);
  const [isFetchingOffers, setIsFetchingOffers] = useState(false);
  const [isFetchingOfferAttribution, setIsFetchingOfferAttribution] = useState(false);

  const [hasErrorOffers, setHasErrorOffers] = useState(false);
  const [hasErrorOfferAttribution, setHasErrorOfferAttribution] = useState(false);

  const fetchOffers = async ({ page = pageNumber, excludedOfferId } = {}) => {
    let listOffers = [];
    let singleOffer = [];
    if (total === offers.length && offers.length > 0) return;

    try {
      setIsFetchingOffers(true);
      const body = await getOffers({ xApiKey, xApiSecret, page });

      if (body.offers.length > 0 && excludedOfferId) {
        listOffers = body.offers.filter(o => o.id !== excludedOfferId);
      } else if (body.offers.length > 0 && !excludedOfferId) {
        listOffers = body.offers;
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
            ? [...o.images.map(image => imageObject(image))]
            : [imageObject(DEFAULT_IMAGE)],
      }));

      setOffers(uniqBy(prop('id'), formattedOffers));

      setTotal(body.totalCount);
      setPageNumber(page);
    } catch (_) {
      setHasErrorOffers(true);
    } finally {
      setIsFetchingOffers(false);
    }
  };

  const fetchOffersAttribution = async () => {
    try {
      setIsFetchingOfferAttribution(true);
      const { data } = await getOfferAttributions({ xApiKey, xApiSecret, externalUserId });

      if (data.attributions) {
        setEnrolledOffers(data.attributions.filter(a => a.enroll).map(a => a.offerId));
        setViewedOffers(data.attributions.filter(a => a.view).map(a => a.offerId));
      }
    } catch (e) {
      setEnrolledOffers([]);
    } finally {
      setIsFetchingOfferAttribution(false);
    }
  };

  const saveOfferAttribution = async ({ offerId, action }) => {
    try {
      await postOfferAttribution({ externalUserId, offerId, action, xApiKey, xApiSecret });

      if (action === 'ENROLL') {
        setEnrolledOffers([...enrolledOffers, parseInt(offerId)]);
      }

      setHasErrorOfferAttribution(false);
    } catch (e) {
      setHasErrorOfferAttribution(true);
      throw new Error(ERROR_CODE[e.response.data.errorCode]);
    }
  };

  const resetOffer = () => {
    setOffers([]);
    setHasErrorOffers(false);
    setHasErrorOfferAttribution(false);
  };

  // useEffect(() => {
  //   (async () => {
  //     setIsFetchingInitialOffer(true);
  //     const urlParams = qs.parse(window.location.search);

  //     await fetchOffersAttribution();

  //     if (urlParams.offer_id) {
  //       await fetchOffers({ excludedOfferId: parseInt(urlParams.offer_id) });
  //     } else {
  //       await fetchOffers();
  //     }

  //     setIsFetchingInitialOffer(false);
  //   })();
  // }, []);

  return (
    <OffersContext.Provider
      value={{
        offers,
        enrolledOffers,
        viewedOffers,
        isShowEnrolledPopup,
        isFetchingInitialOffer,
        isFetchingOffers,
        isFetchingOfferAttribution,
        hasErrorOffers,
        hasErrorOfferAttribution,
        pageNumber,
        total,
        onFetchingInitialOffer: setIsFetchingInitialOffer,
        onFetchOffers: fetchOffers,
        onFetchOffersAttribution: fetchOffersAttribution,
        onResetOffers: resetOffer,
        onSaveOfferAttribution: saveOfferAttribution,
        onShowEnrolledPopup: setIsShowEnrolledPopup,
      }}
      {...props}
    />
  );
};

export const useOffers = () => React.useContext(OffersContext);

export default OffersProvider;
