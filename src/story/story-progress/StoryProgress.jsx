import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { useStory } from '../story-provider';

import classes from './StoryProgress.scss';

const StoryProgress = ({ story, duration, isStoryStarted }) => {
  const { activeStoryItem, activeStoryItemIndex, isPause, pauseStoryId } = useStory();
  return (
    <div className={classes.progress}>
      {story.images.map((s, index) => {
        const isInProgress = activeStoryItem.id === s.id && isStoryStarted;
        const isFinished = activeStoryItemIndex > index;
        const isPaused = isPause && s.id === pauseStoryId;
        return (
          <div
            key={s.id}
            className={clsx(
              classes.progressItem,
              isFinished && classes.isFinished,
              isInProgress && classes.isInProgress,
              isPaused && classes.isPause
            )}
          >
            <div className={classes.progressBar} style={{ animationDuration: `${duration}s` }} />
          </div>
        );
      })}
    </div>
  );
};

StoryProgress.propTypes = {
  duration: PropTypes.number.isRequired,
  isStoryStarted: PropTypes.bool.isRequired,
  story: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default StoryProgress;
