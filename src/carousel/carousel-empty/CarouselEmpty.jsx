import React from 'react';

import { useOffers } from '../../offers-provider';

import EmptyState from './empty-state.svg';
import classes from './CarouselEmpty.scss';

const CarouselEmpty = () => {
  const { onFetchOffers, onResetOffers } = useOffers();
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Offer Carousel Isn&lsquo;t Available Right Nows</h1>
      <p className={classes.description}>
        This is may be because of a technical error that we’re working to get fixed. Try reloading
        this page.
      </p>
      <button
        type="button"
        onClick={() => {
          alert('ON CLICK TRY AGAIN');
          onResetOffers();
          onFetchOffers({ page: 0 });
        }}
        className={classes.tryAgainButton}
      >
        Try Again
      </button>
      <EmptyState className={classes.emptyState} />
    </div>
  );
};

export default CarouselEmpty;
