import React from 'react';
import Icon from '@pulse/ui-lib/src/components/icons/Icon';
import PropTypes from 'prop-types';

import classes from './StoryHeader.scss';

const StoryHeader = ({ story, onSetOfferDetailsOpen }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.leftWrapper}>
        <div className={classes.imageWrapper}>
          <img src={story.merchant.image} alt={story.merchant.name} />
        </div>
        <span className={classes.title}>{story.merchant.name}</span>
      </div>
      <div className={classes.rightWrapper}>
        <button
          onClick={() => onSetOfferDetailsOpen()}
          className={classes.buttonWrapper}
          type="button"
        >
          <Icon icon={['fas', 'ellipsis-h']} />
        </button>
        <button
          onClick={() => {
            if (typeof PulseiD !== 'undefined') {
              // eslint-disable-next-line no-undef
              PulseiD.onCancel();
            }
          }}
          className={classes.buttonWrapper}
          type="button"
        >
          <Icon icon={['fas', 'times']} />
        </button>
      </div>
    </div>
  );
};

StoryHeader.propTypes = {
  story: PropTypes.shape({
    merchant: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onSetOfferDetailsOpen: PropTypes.func.isRequired,
};

export default StoryHeader;
