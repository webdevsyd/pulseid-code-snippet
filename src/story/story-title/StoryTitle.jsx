import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import Icon from '@pulse/ui-lib/src/components/icons/Icon';

import * as actions from './actions';
import * as selectors from './selectors';
import EnrollIcon from './icon-enroll.svg';
import classes from './StoryTitle.scss';

const StoryTitle = ({ enrolledOffers, story, isSaving, onClickEnroll, onSetIsSaving }) => {
  const isOfferEnrolled = enrolledOffers.includes(story.id);

  const handleEnroll = async () => {
    try {
      onSetIsSaving(true);
      await onClickEnroll(story.id);
      onSetIsSaving(false);
    } catch {
      onSetIsSaving(false);
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
  isSaving: PropTypes.bool.isRequired,
  enrolledOffers: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClickEnroll: PropTypes.func.isRequired,
  onSetIsSaving: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    isSaving: selectors.isSaving(state),
  }),
  {
    onSetIsSaving: actions.setIsSaving,
  }
)(memo(StoryTitle));
