import React from 'react';
import HorizontalScroll from '@pulse/ui-lib/src/components/horizontal-infinite-scroll';

import CarouselCard from '../carousel-card/CarouselCard';
import CarouselLoader from '../carousel-loader/CarouselLoader';
import { useOffers } from '../../offers-provider';
import { useConfig } from '../../config-provider';

import classes from './CarouselLists.scss';

const CarouselLists = () => {
  const { offers, isFetchingOffers, onFetchOffers, pageNumber } = useOffers();
  const { title, subTitle } = useConfig();
  return (
    <>
      {title !== '' && <span className={classes.title}>YOUR OFFERS</span>}
      {subTitle !== '' && (
        <span className={classes.subTitle}>Because of your recent Wellness purchase</span>
      )}
      <HorizontalScroll
        className={classes.wrapper}
        offsetRight={100}
        onReachRight={() => {
          if (!isFetchingOffers) {
            onFetchOffers({ page: pageNumber + 1 });
          }
        }}
      >
        {offers.map(offer => (
          <CarouselCard key={offer.id} offer={offer} />
        ))}
        {isFetchingOffers && offers.length > 0 && <CarouselLoader />}
      </HorizontalScroll>
    </>
  );
};

export default CarouselLists;
