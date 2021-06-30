import React from 'react';
import Icon from '@pulse/ui-lib/src/components/icons/Icon';
import PropTypes from 'prop-types';

import { useStory } from '../story-provider';

import classes from './StoryHeader.scss';

const StoryHeader = ({ onSetOfferDetailsOpen }) => {
  const { activeStory } = useStory();
  return (
    <div className={classes.wrapper}>
      <div className={classes.leftWrapper}>
        <div className={classes.imageWrapper}>
          <img src={activeStory.merchant.image} alt={activeStory.merchant.name} />
        </div>
        <span className={classes.title}>{activeStory.merchant.name}</span>
      </div>
      <div className={classes.rightWrapper}>
        <button
          onClick={() => onSetOfferDetailsOpen()}
          className={classes.buttonWrapper}
          type="button"
        >
          <Icon icon={['fas', 'ellipsis-h']} />
        </button>
        <button className={classes.buttonWrapper} type="button">
          <Icon icon={['fas', 'times']} />
        </button>
      </div>
    </div>
  );
};

StoryHeader.propTypes = {
  onSetOfferDetailsOpen: PropTypes.func.isRequired,
};

export default StoryHeader;
