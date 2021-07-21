import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';

import StoryLists from '../story-lists';

import * as actions from './actions';
import * as selectors from './selectors';

const StoryApp = ({
  isPause,
  isStoryStarted,
  isSwiping,
  pauseStoryId,
  backgroundColor,
  duration,
  startTime,
  activeStory,
  activeStoryIndex,
  activeStoryItem,
  activeStoryItemIndex,
  onSaveOfferAttribution,
  onSetActiveStory,
  onSetActiveStoryIndex,
  onSetActiveStoryItem,
  onSetActiveStoryItemIndex,
  onSetBackgroundColor,
  onSetIsStoryStarted,
  onSetIsPause,
  onSetPauseStoryId,
  onSetStartTime,
  onSetDuration,
  onResetDuration,
  onResetPause,
  onSetIsSwiping,
}) => {
  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);

    if (urlParams.offer_id) {
      onSaveOfferAttribution({
        offerId: urlParams.offer_id,
        action: 'VIEW',
      });
    }
  }, []);

  return (
    <StoryLists
      isPause={isPause}
      isStoryStarted={isStoryStarted}
      isSwiping={isSwiping}
      pauseStoryId={pauseStoryId}
      backgroundColor={backgroundColor}
      duration={duration}
      startTime={startTime}
      activeStory={activeStory}
      activeStoryIndex={activeStoryIndex}
      activeStoryItem={activeStoryItem}
      activeStoryItemIndex={activeStoryItemIndex}
      onSetActiveStory={onSetActiveStory}
      onSetActiveStoryIndex={onSetActiveStoryIndex}
      onSetActiveStoryItem={onSetActiveStoryItem}
      onSetActiveStoryItemIndex={onSetActiveStoryItemIndex}
      onSetBackgroundColor={onSetBackgroundColor}
      onSetIsStoryStarted={onSetIsStoryStarted}
      onSetStartTime={onSetStartTime}
      onSetIsPause={onSetIsPause}
      onSetPauseStoryId={onSetPauseStoryId}
      onSetDuration={onSetDuration}
      onResetDuration={onResetDuration}
      onResetPause={onResetPause}
      onSetIsSwiping={onSetIsSwiping}
    />
  );
};

StoryApp.defaultProps = {
  activeStoryIndex: null,
  activeStoryItemIndex: null,
  startTime: null,
};

StoryApp.propTypes = {
  activeStory: PropTypes.shape({}).isRequired,
  activeStoryItem: PropTypes.shape({}).isRequired,

  isPause: PropTypes.bool.isRequired,
  isStoryStarted: PropTypes.bool.isRequired,
  isSwiping: PropTypes.bool.isRequired,

  activeStoryIndex: PropTypes.number,
  activeStoryItemIndex: PropTypes.number,
  pauseStoryId: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  startTime: PropTypes.number,

  onSaveOfferAttribution: PropTypes.func.isRequired,
  onSetActiveStory: PropTypes.func.isRequired,
  onSetActiveStoryIndex: PropTypes.func.isRequired,
  onSetActiveStoryItem: PropTypes.func.isRequired,
  onSetActiveStoryItemIndex: PropTypes.func.isRequired,
  onSetBackgroundColor: PropTypes.func.isRequired,
  onSetIsStoryStarted: PropTypes.func.isRequired,
  onSetIsPause: PropTypes.func.isRequired,
  onSetPauseStoryId: PropTypes.func.isRequired,
  onSetDuration: PropTypes.func.isRequired,
  onResetDuration: PropTypes.func.isRequired,
  onSetStartTime: PropTypes.func.isRequired,
  onResetPause: PropTypes.func.isRequired,
  onSetIsSwiping: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    activeStory: selectors.getActiveStory(state),
    activeStoryIndex: selectors.getActiveStoryIndex(state),
    activeStoryItem: selectors.getActiveStoryItem(state),
    activeStoryItemIndex: selectors.getActiveStoryItemIndex(state),
    isPause: selectors.isPause(state),
    isStoryStarted: selectors.isStoryStarted(state),
    isSwiping: selectors.isSwiping(state),
    pauseStoryId: selectors.pauseStoryId(state),
    backgroundColor: selectors.getBackgroundColor(state),
    duration: selectors.getDuration(state),
    startTime: selectors.getStartTime(state),
  }),
  {
    onSaveOfferAttribution: actions.postOfferAttribution,
    onSetActiveStory: actions.setActiveStory,
    onSetActiveStoryIndex: actions.setActiveStoryIndex,
    onSetActiveStoryItem: actions.setActiveStoryItem,
    onSetActiveStoryItemIndex: actions.setActiveStoryItemIndex,
    onSetBackgroundColor: actions.setBackgroundColor,
    onSetIsStoryStarted: actions.setIsStoryStarted,
    onSetStartTime: actions.setStartTime,
    onSetDuration: actions.setDuration,
    onSetIsPause: actions.setIsPause,
    onSetPauseStoryId: actions.setPauseStoryId,
    onResetDuration: actions.resetDuration,
    onResetPause: actions.resetPause,
    onSetIsSwiping: actions.setIsSwiping,
  }
)(StoryApp);
