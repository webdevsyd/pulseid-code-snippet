import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@pulse/ui-lib/src/components/icons/Icon';

import { useStory } from '../story-provider';

import EnrollIcon from './icon-enroll.svg';
import classes from './StoryTitle.scss';

const StoryDetails = ({ onClickEnroll }) => {
  const { activeStory } = useStory();

  // This is for the saving status only in this component
  const [isSaving, setIsSaving] = useState(false);

  const handleEnroll = async () => {
    try {
      setIsSaving(true);
      await onClickEnroll(activeStory.id);
    } catch {
      setIsSaving(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>{activeStory.title}</h1>
      <div className={classes.otherDetailsWrapper}>
        <div className={classes.dateWrapper}>
          <span className={classes.date}>17 days left</span>
        </div>
        <div className={classes.conditionWrapper}>
          <Icon icon={['fa', 'info-circle']} className={classes.icon} />
          <span className={classes.condition}>Conditions of Use</span>
        </div>
      </div>
      <button
        type="button"
        disabled={isSaving}
        className={classes.enrollButton}
        onClick={() => handleEnroll(activeStory.id)}
      >
        {isSaving ? (
          <div className={classes.loadingSpinner} />
        ) : (
          <>
            <EnrollIcon className={classes.enrollIcon} />
            Enroll
          </>
        )}
      </button>
    </div>
  );
};

StoryDetails.propTypes = {
  onClickEnroll: PropTypes.func.isRequired,
};

export default StoryDetails;
