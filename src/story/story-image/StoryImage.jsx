/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useStory } from '../story-provider';

import classes from './StoryImage.scss';

window.storyImageTimer = null;
const touchDuration = 300; // length of time we want the user to touch before we do something

const StoryImage = ({ story, onImageLoad, onStoryItemNavigation }) => {
  const { activeStory, activeStoryItem, onSetIsPause } = useStory();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onImageLoad();
  };

  const onTouchStartForSwiping = () => {
    if (!window.storyImageTimer) {
      window.storyImageTimer = setTimeout(() => {
        /* Do nothing */
      }, touchDuration);
    }
  };

  const onTouchEndForNavigation = e => {
    if (window.storyImageTimer) {
      console.log('clear swipe timeout');
      clearTimeout(window.storyImageTimer);
      window.storyImageTimer = null;

      if (isLoaded) {
        onStoryItemNavigation({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
      }
    }
  };

  useEffect(() => {
    if (story.id === activeStory.id) {
      console.log('re render due to item.id changed', activeStoryItem.id);

      Promise.resolve().then(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          onSetIsPause(false);
          setIsLoaded(false);
        });
      });
    }
  }, [activeStory, activeStoryItem.id, activeStoryItem.src]);

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.itemWrapper}
        onTouchStart={onTouchStartForSwiping}
        onTouchEnd={onTouchEndForNavigation}
      >
        <div className={classes.imageWrapper}>
          <div className={clsx(classes.loaderWrapper, isLoaded ? classes.hide : classes.show)}>
            <div className={classes.spinner} />
          </div>
          {activeStory.id === story.id && (
            <img
              id={`offerImage-${activeStoryItem.id}`}
              crossOrigin="anonymous"
              alt="offer"
              src={activeStoryItem.src}
              onLoad={handleImageLoad}
              className={clsx(isLoaded ? classes.show : classes.hide)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

StoryImage.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onImageLoad: PropTypes.func.isRequired,
  onStoryItemNavigation: PropTypes.func.isRequired,
};

export default StoryImage;
