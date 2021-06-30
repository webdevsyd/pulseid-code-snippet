/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import { useOffers } from '../../offers-provider';

import classes from './CarouselCard.scss';

const CarouselCard = ({ offer }) => {
  const { onSaveOfferAttribution } = useOffers();
  return (
    <div
      onClick={() => {
        if (typeof PulseiD !== 'undefined') {
          // eslint-disable-next-line no-undef
          PulseiD.onClickOffer(offer.id);
          onSaveOfferAttribution({ offerId: offer.id, action: 'VIEW' });
        }
      }}
      className={classes.card}
      style={{
        backgroundImage: `url(${offer.images[0].src})`,
      }}
    >
      <div className={classes.shadow} />
      {offer.rewardValue ? (
        <span className={classes.title}>
          {offer.rewardType === 'FIXED' && `${offer.currency} ${offer.rewardValue} Cashback`}
          {offer.rewardType === 'PERCENTAGE' && `${offer.rewardValue}% Cashback`}
        </span>
      ) : (
        <div />
      )}
      <div className={classes.info}>
        <div className={classes.imageContainer}>
          <img
            src={offer.merchant.image}
            title={offer.merchant.name}
            alt="test"
            className={classes.image}
          />
        </div>
        <span className={classes.company}>{offer.merchant.name}</span>
      </div>
    </div>
  );
};

CarouselCard.defaultProps = {
  offer: {
    rewardType: '',
    rewardValue: null,
  },
};

CarouselCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rewardType: PropTypes.string,
    rewardValue: PropTypes.number,
    currency: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    merchant: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};

export default CarouselCard;
