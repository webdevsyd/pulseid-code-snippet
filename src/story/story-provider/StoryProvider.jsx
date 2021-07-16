/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import ColorThief from 'colorthief';

import { useOffers } from '../../offers-provider';

import { DURATION_IN_MS } from './constants';

const StoryContext = createContext({});

const colorThief = new ColorThief();

const StoryProvider = props => {
  const swiperRef = useRef(null);
  const {
    offers: storiesData,
    total,
    onSaveOfferAttribution,
    pageNumber,
    onFetchOffers,
  } = useOffers();
  const [hasRefetched, setHasRefetched] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [activeStory, setActiveStory] = useState({});
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeStoryItem, setActiveStoryItem] = useState({});
  const [activeStoryItemIndex, setActiveStoryItemIndex] = useState(0);

  const [isPause, setIsPause] = useState(true);
  const [pauseStoryId, setPauseStoryId] = useState(null);

  const [duration, setDuration] = useState(DURATION_IN_MS);
  const [isStoryStarted, setIsStoryStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const [backgroundColor, setBackgroundColor] = useState('');

  const handleResetDuration = () => {
    return setDuration(DURATION_IN_MS);
  };

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

  const handleSetNewActiveStory = storyIndex => {
    onSaveOfferAttribution({ offerId: storiesData[storyIndex].id, action: 'VIEW' });

    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        setIsStoryStarted(false);
        setIsSwiping(false);
      });
    });

    handleNewActiveStory(storyIndex);

    handleResetDuration();
  };

  const handleNextStory = () => {
    if (activeStoryIndex < storiesData.length - 1) {
      const storyIndex = activeStoryIndex + 1;
      handleSetNewActiveStory(storyIndex);
    }
  };

  const handlePreviousStory = () => {
    if (activeStoryIndex !== 0) {
      const storyIndex = activeStoryIndex - 1;
      handleSetNewActiveStory(storyIndex);
    }
  };

  const handleNextStoryImage = () => {
    if (activeStoryItemIndex < activeStory.images.length - 1) {
      console.log('next story image', 'image id', activeStoryItemIndex);

      Promise.resolve().then(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          const storyItemIndex = activeStoryItemIndex + 1;
          handleNewActiveStoryItem(storyItemIndex);
          handleResetDuration();
        });
      });
    } else {
      console.log('next story from image');
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePreviousStoryImage = () => {
    if (activeStoryItemIndex !== 0) {
      console.log('previous story image');

      Promise.resolve().then(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          const storyItemIndex = activeStoryItemIndex - 1;
          handleNewActiveStoryItem(storyItemIndex);
          handleResetDuration();
        });
      });
    } else {
      console.log('previous story from image');
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handlePlayStory = () => {
    console.log('PLAY STORY', activeStory.id);
    window.clearTimeout(window.timerId);

    window.timerId = window.setTimeout(() => {
      if (activeStoryItemIndex < activeStory.images.length - 1) {
        Promise.resolve().then(() => {
          ReactDOM.unstable_batchedUpdates(() => {
            setIsStoryStarted(false);
            handleNextStoryImage(); // Next Item in the Story
          });
        });
      } else if (
        activeStoryItemIndex === activeStory.images.length - 1 &&
        storiesData.length < total
      ) {
        console.log('next story from timer');
        swiperRef.current.swiper.slideNext();
      }
    }, duration);
  };

  const handleResumeStory = () => {
    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        handleResetPause();
        handlePlayStory();
      });
    });
  };

  const handlePauseStory = id => {
    if (!isPause) {
      console.log('PAUSE STORY', id);
      window.clearTimeout(window.timerId);

      Promise.resolve().then(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          setDuration(duration - (Date.now() - startTime));
          setIsPause(true);
          setPauseStoryId(id);
        });
      });
    }
  };

  const handleStoryItemNavigation = ({ x, y }) => {
    if (!isSwiping) {
      let activated = false;

      if (x <= 80 && y >= 100) {
        handlePreviousStoryImage();
        activated = true;
      } else if (x >= window.innerWidth - 100 && y >= 100) {
        handleNextStoryImage();
        activated = true;
      }

      if (!activated) {
        if (!isPause) {
          handlePauseStory(activeStoryItem.id);
        } else {
          handleResumeStory();
        }
      }
    }
  };

  const start = () => {
    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        console.log('START', 'STORY ID ====>', activeStory.id);
        setStartTime(Date.now());
        setIsStoryStarted(true); // This will identify if the story animation will start
      });
    });

    window.clearTimeout(window.timerId);

    handlePlayStory();
  };

  const handleImageLoad = () => {
    console.log('IMAGE LOADED');

    start();

    const dominantColor = colorThief.getColor(
      document.getElementById(`offerImage-${activeStoryItem.id}`)
    );

    setBackgroundColor(`rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`);
  };

  const handleSlideResetTransitionEnd = swiper => {
    // Trigger when going to the next slide but decided not any more :D
    handleResetPause();
    setIsSwiping(false);

    // Trigger when the user swipe back even though the current story is the first one
    if (swiper.activeIndex === 0 && swiper.isBeginning) {
      handleResumeStory();
    } else if (swiper.activeIndex === storiesData.length - 1) {
      handleResumeStory();
    }
  };

  const handleSlidePrevTransitionEnd = () => {
    // Trigger when user's swipe
    // Trigger when swiperRef.current.swiper.slidePrev() was called
    console.log('slidePrevTransitionEnd prev story');
    handlePreviousStory();
  };

  const handleSlideNextTransitionEnd = async () => {
    // Trigger when user's swipe
    // Trigger when swiperRef.current.swiper.slideNext() was called
    console.log('slideNextTransitionEnd next story');

    if (activeStoryIndex === storiesData.length - 1) {
      console.log('refetch offers');
      setHasRefetched(false);
      await onFetchOffers({ page: pageNumber + 1 });

      setHasRefetched(true);
    } else {
      handleNextStory();
    }
  };

  const handleSliderMove = swiper => {
    // Trigger when user starts to swipe
    if (!isSwiping) {
      console.log('onSlideMove');
      setIsSwiping(true);
      handlePauseStory(storiesData[swiper.activeIndex].images[activeStoryItemIndex].id);
    }
  };

  useEffect(() => {
    if (hasRefetched && storiesData.length > 0) {
      console.log('next story after refetching offers', storiesData);
      handleNextStory();
    }
  }, [hasRefetched, storiesData]);

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

        isPause,
        pauseStoryId,
        onPauseStory: handlePauseStory,
        onSetIsPause: setIsPause,
        onSetPauseStoryId: setPauseStoryId,

        onResumeStory: handleResumeStory,

        onImageLoad: handleImageLoad,

        onStoryItemNavigation: handleStoryItemNavigation,
        onSlideResetTransitionEnd: handleSlideResetTransitionEnd,
        onSlidePrevTransitionEnd: handleSlidePrevTransitionEnd,
        onSlideNextTransitionEnd: handleSlideNextTransitionEnd,
        onSliderMove: handleSliderMove,

        backgroundColor,
        isStoryStarted,

        swiperRef,
      }}
      {...props}
    />
  );
};

export const useStory = () => useContext(StoryContext);

export default StoryProvider;
