import React from 'react';
import PropTypes from 'prop-types';

import EmptyState from './empty-state.svg';
import classes from './CarouselEmpty.scss';

const CarouselEmpty = ({ onFetchOffers, onResetOffers }) => {
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

CarouselEmpty.propTypes = {
  onFetchOffers: PropTypes.func.isRequired,
  onResetOffers: PropTypes.func.isRequired,
};

export default CarouselEmpty;
