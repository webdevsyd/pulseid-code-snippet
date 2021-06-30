/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';

import { useOffers } from '../../offers-provider';

const StoryContext = createContext({});

const StoryProvider = props => {
  const { offers: storiesData } = useOffers();
  const [activeStory, setActiveStory] = useState({});
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeStoryItem, setActiveStoryItem] = useState({});
  const [activeStoryItemIndex, setActiveStoryItemIndex] = useState(0);

  const [isPause, setIsPause] = useState(true);
  const [pauseStoryId, setPauseStoryId] = useState(null);

  const handleResetPause = () => {
    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        setIsPause(false);
        setPauseStoryId(null);
      });
    });
  };

  const handleNewActiveStory = storyIndex => {
    handleResetPause();

    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        setActiveStoryIndex(storyIndex);
        setActiveStoryItemIndex(0);
        setActiveStory(storiesData[storyIndex]);
        setActiveStoryItem(storiesData[storyIndex].images[0]);
      });
    });
  };

  const handleNewActiveStoryItem = storyItemIndex => {
    setActiveStoryItemIndex(storyItemIndex);
    setActiveStoryItem(activeStory.images[storyItemIndex]);
  };

  return (
    <StoryContext.Provider
      value={{
        activeStory,
        activeStoryIndex,
        activeStoryItem,
        activeStoryItemIndex,
        onSetActiveStory: setActiveStory,
        onSetActiveStoryIndex: setActiveStoryIndex,
        onSetActiveStoryItem: setActiveStoryItem,
        onSetActiveStoryItemIndex: setActiveStoryItemIndex,

        onSetNewActiveStory: handleNewActiveStory,
        onSetNewActiveStoryItem: handleNewActiveStoryItem,

        isPause,
        pauseStoryId,
        onSetIsPause: setIsPause,
        onSetPauseStoryId: setPauseStoryId,
        onResetPauseState: handleResetPause,
      }}
      {...props}
    />
  );
};

export const useStory = () => useContext(StoryContext);

export default StoryProvider;
