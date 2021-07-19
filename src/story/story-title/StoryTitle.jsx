import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Icon from '@pulse/ui-lib/src/components/icons/Icon';

import { useConfig } from '../../config-provider';
import { useOffers } from '../../offers-provider';

import EnrollIcon from './icon-enroll.svg';
import classes from './StoryTitle.scss';

const StoryTitle = ({ story, onClickEnroll }) => {
  // This is for the saving status only in this component
  const [isSaving, setIsSaving] = useState(false);

  const { backgroundColor } = useConfig();
  const { enrolledOffers } = useOffers();

  const isOfferEnrolled = enrolledOffers.includes(story.id);

  const handleEnroll = async () => {
    try {
      setIsSaving(true);
      await onClickEnroll(story.id);
      setIsSaving(false);
    } catch {
      setIsSaving(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>{story.title}</h1>
      <div className={classes.otherDetailsWrapper}>
        {story.validTo && (
          <div className={classes.dateWrapper}>
            <span className={classes.date}>17 days left</span>
          </div>
        )}
        <div className={classes.conditionWrapper}>
          <Icon icon={['fa', 'info-circle']} className={classes.icon} />
          <span className={classes.condition}>Conditions of Use</span>
        </div>
      </div>
      <button
        type="button"
        disabled={isSaving || isOfferEnrolled}
        className={clsx(classes.enrollButton, isOfferEnrolled && classes.enrolled)}
        style={{ backgroundColor }}
        onClick={() => handleEnroll(story.id)}
      >
        {isSaving ? (
          <div className={classes.loadingSpinner} />
        ) : (
          <>
            <EnrollIcon className={classes.enrollIcon} />
            {isOfferEnrolled ? 'Enrolled' : 'Enroll'}
          </>
        )}
      </button>
    </div>
  );
};

StoryTitle.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    validTo: PropTypes.string,
  }).isRequired,
  onClickEnroll: PropTypes.func.isRequired,
};

export default memo(StoryTitle);
