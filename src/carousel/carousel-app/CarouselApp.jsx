import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CarouselLoader from '../carousel-loader';
import CarouselEmpty from '../carousel-empty';
import CarouselLists from '../carousel-lists';
import * as carouselListsActions from '../carousel-lists/actions';
import * as carouselListsSelectors from '../carousel-lists/selectors';

import classes from './CarouselApp.scss';

const CarouselApp = ({ isFetchingOffers, offers, initialize }) => {
  useEffect(() => {
    initialize();
  }, []);

  if (!isFetchingOffers && offers.length === 0) return <CarouselEmpty />;

  if (isFetchingOffers && offers.length === 0) {
    return (
      <div className={classes.scrollWrapper}>
        <CarouselLoader />
      </div>
    );
  }

  return <CarouselLists />;
};

CarouselApp.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isFetchingOffers: PropTypes.bool.isRequired,
  initialize: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    offers: carouselListsSelectors.getOffers(state),
    isFetchingOffers: carouselListsSelectors.isFetchingOffers(state),
  }),
  {
    initialize: carouselListsActions.initialize,
  }
)(CarouselApp);
