import React, { useEffect } from 'react';

import CarouselLoader from '../carousel-loader';
import CarouselEmpty from '../carousel-empty';
import CarouselLists from '../carousel-lists';
import { useOffers } from '../../offers-provider';

import classes from './CarouselApp.scss';

const CarouselApp = () => {
  const {
    offers,
    isFetchingInitialOffer,
    hasErrorOffers,
    onFetchingInitialOffer,
    onFetchOffersAttribution,
    onFetchOffers,
  } = useOffers();

  useEffect(() => {
    (async () => {
      onFetchingInitialOffer(true);

      await onFetchOffersAttribution();
      await onFetchOffers();

      onFetchingInitialOffer(false);
    })();
  }, []);

  if ((!isFetchingInitialOffer && offers.length === 0) || hasErrorOffers) return <CarouselEmpty />;
  if (isFetchingInitialOffer && offers.length === 0)
    return (
      <div className={classes.scrollWrapper}>
        <CarouselLoader />
      </div>
    );
  if (offers.length > 0) return <CarouselLists />;
  return null;
};

export default CarouselApp;
