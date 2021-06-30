import React from 'react';

import CarouselLoader from '../carousel-loader';
import CarouselEmpty from '../carousel-empty';
import CarouselLists from '../carousel-lists';
import { useOffers } from '../../offers-provider';

import classes from './CarouselApp.scss';

const CarouselApp = () => {
  const { isFetchingOffers, offers, hasErrorOffers } = useOffers();
  if ((!isFetchingOffers && offers.length === 0) || hasErrorOffers) return <CarouselEmpty />;
  if (isFetchingOffers && offers.length === 0)
    return (
      <div className={classes.scrollWrapper}>
        <CarouselLoader />
      </div>
    );
  if (offers.length > 0) return <CarouselLists />;
  return null;
};

export default CarouselApp;
