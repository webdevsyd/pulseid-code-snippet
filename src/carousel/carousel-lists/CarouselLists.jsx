import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HorizontalScroll from '@pulse/ui-lib/src/components/horizontal-infinite-scroll';

import CarouselCard from '../carousel-card/CarouselCard';
import CarouselLoader from '../carousel-loader/CarouselLoader';
import * as config from '../../config';

import * as actions from './actions';
import * as selectors from './selectors';
import classes from './CarouselLists.scss';

const CarouselLists = ({
  isFetchingOffers,
  offers,
  currentPage,
  configTitle,
  configSubTitle,
  onFetchOffers,
  onSetIsFetchingOffers,
}) => {
  return (
    <>
      {configTitle && <span className={classes.title}>{configTitle}</span>}
      {configSubTitle && <span className={classes.subTitle}>{configSubTitle}</span>}
      <HorizontalScroll
        className={classes.wrapper}
        offsetRight={100}
        onReachRight={async () => {
          if (!isFetchingOffers) {
            onSetIsFetchingOffers(true);
            await onFetchOffers({ page: currentPage + 1 });
            onSetIsFetchingOffers(false);
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

  configTitle: PropTypes.string.isRequired,
  configSubTitle: PropTypes.string.isRequired,

  onFetchOffers: PropTypes.func.isRequired,
  onSetIsFetchingOffers: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    isFetchingOffers: selectors.isFetchingOffers(state),
    offers: selectors.getOffers(state),
    currentPage: selectors.getCurrentPage(state),
    configTitle: config.getTitle(state),
    configSubTitle: config.getSubTitle(state),
  }),
  {
    onFetchOffers: actions.fetchOffers,
    onSetIsFetchingOffers: actions.setIsFetchingOffers,
  }
)(CarouselLists);
