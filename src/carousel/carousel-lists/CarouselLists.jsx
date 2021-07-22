import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HorizontalScroll from '@pulse/ui-lib/src/components/horizontal-infinite-scroll';

import CarouselCard from '../carousel-card/CarouselCard';
import CarouselLoader from '../carousel-loader/CarouselLoader';

import * as actions from './actions';
import * as selectors from './selectors';
import classes from './CarouselLists.scss';

const CarouselLists = ({ isFetchingOffers, offers, currentPage, onFetchOffers }) => {
  return (
    <>
      {/* <span className={classes.title}>YOUR OFFERS</span>
      <span className={classes.subTitle}>Because of your recent Wellness purchase</span> */}
      <HorizontalScroll
        className={classes.wrapper}
        offsetRight={100}
        onReachRight={() => {
          if (!isFetchingOffers) {
            onFetchOffers({ page: currentPage + 1 });
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

CarouselLists.propTypes = {
  isFetchingOffers: PropTypes.bool.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentPage: PropTypes.number.isRequired,

  onFetchOffers: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    isFetchingOffers: selectors.isFetchingOffers(state),
    offers: selectors.getOffers(state),
    currentPage: selectors.getCurrentPage(state),
  }),
  {
    onFetchOffers: actions.fetchOffers,
  }
)(CarouselLists);
