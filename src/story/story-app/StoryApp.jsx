import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ColorThief from 'colorthief';
import qs from 'query-string';
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import 'swiper/swiper.min.css?raw';

import { useStory } from '../story-provider';
import StoryProgress from '../story-progress';
import StoryHeader from '../story-header';
import StoryImage from '../story-image';
import StoryTitle from '../story-title';
import StoryLoader from '../story-loader';
import StoryEmpty from '../story-empty';
import StoryDetails from '../story-details';
import { useOffers } from '../../offers-provider';

import { DURATION_IN_SEC, DURATION_IN_MS } from './constants';
import classes from './StoryApp.scss';

const colorThief = new ColorThief();

const StoryApp = () => {
  const {
    activeStory,
    activeStoryIndex,
    activeStoryItem,
    activeStoryItemIndex,
    onSetActiveStory,
    onSetActiveStoryItem,

    onSetNewActiveStory,
    onSetNewActiveStoryItem,

    isPause,
    onResetPauseState,
    onSetIsPause,
    onSetPauseStoryId,
  } = useStory();
  const {
    offers: storiesData,
    onSaveOfferAttribution,
    isFetchingOffers,
    hasErrorOffers,
  } = useOffers();
  const swiperRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isOfferDetailsOpen, setIsOfferDetailsOpen] = useState(false);
  const [isStoryStarted, setIsStoryStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(DURATION_IN_MS);

  const [backgroundColor, setBackgroundColor] = useState('');

  const handleResetDuration = () => {
    return setDuration(DURATION_IN_MS);
  };

  const handleSetNewActiveStory = storyIndex => {
    onSaveOfferAttribution({ offerId: storiesData[storyIndex].id, action: 'VIEW' });

    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        setIsStoryStarted(false);
        setIsSwiping(false);
      });
    });

    onSetNewActiveStory(storyIndex);

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
          onSetNewActiveStoryItem(storyItemIndex);
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
          onSetNewActiveStoryItem(storyItemIndex);
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
      } else if (activeStoryItemIndex !== storiesData.length - 1) {
        console.log('next story from timer');
        swiperRef.current.swiper.slideNext();
      }
    }, duration);
  };

  const handleResumeStory = () => {
    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        onResetPauseState();
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
          onSetIsPause(true);
          onSetPauseStoryId(id);
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

  const onImageLoad = () => {
    console.log('IMAGE LOADED');

    start();

    const dominantColor = colorThief.getColor(
      document.getElementById(`offerImage-${activeStoryItem.id}`)
    );

    setBackgroundColor(`rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`);
  };

  const handleToggleOfferDetailsBottomSheet = () => {
    if (isOfferDetailsOpen) {
      console.log('close bottom sheet');

      Promise.resolve().then(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          setIsOfferDetailsOpen(false);
          handleResumeStory();
        });
      });
    } else if (!isOfferDetailsOpen && !isPause) {
      console.log('open bottom sheet');
      handlePauseStory(activeStoryItem.id);
      setIsOfferDetailsOpen(true);
    } else if (!isOfferDetailsOpen && isPause) {
      console.log('open bottom sheet');
      setIsOfferDetailsOpen(true);
    }
  };

  const handleEnrollOffer = async id => {
    console.log('click enroll offer button');

    if (!isPause) {
      handlePauseStory(id);
    }

    await onSaveOfferAttribution({ offerId: id, action: 'ENROLL' });
  };

  const handleSlideResetTransitionEnd = swiper => {
    // Trigger when going to the next slide but decided not any more :D
    onResetPauseState();
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

  const handleSlideNextTransitionEnd = () => {
    // Trigger when user's swipe
    // Trigger when swiperRef.current.swiper.slideNext() was called
    console.log('slideNextTransitionEnd next story');
    handleNextStory();
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
    if (Object.keys(activeStory).length === 0 && storiesData.length > 0) {
      console.log('SET ACTIVE STORY');

      Promise.resolve().then(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          onSetActiveStory(storiesData[activeStoryIndex]);

          if (storiesData[activeStoryIndex].images.length > 0) {
            onSetActiveStoryItem(storiesData[activeStoryIndex].images[activeStoryItemIndex]);
          }
        });
      });
    }
  }, [storiesData]);

  useEffect(() => {
    const urlParams = qs.parse(window.location.search);

    if (urlParams.offer_id) {
      onSaveOfferAttribution({
        offerId: urlParams.id,
        action: urlParams.offer_id,
      });
    }
  }, []);

  if ((!isFetchingOffers && storiesData.length === 0) || hasErrorOffers) return <StoryEmpty />;

  if (isFetchingOffers) return <StoryLoader />;

  return (
    <>
      <Swiper
        className={classes.swiperWrapper}
        ref={swiperRef}
        onSlideResetTransitionEnd={swiper => handleSlideResetTransitionEnd(swiper)}
        onSlidePrevTransitionEnd={handleSlidePrevTransitionEnd}
        onSlideNextTransitionEnd={handleSlideNextTransitionEnd}
        onSliderMove={swiper => handleSliderMove(swiper)}
      >
        {Object.keys(activeStory).length > 0 &&
          storiesData.map(s => {
            return (
              <SwiperSlide key={s.id}>
                <div
                  className={classes.wrapper}
                  style={{
                    backgroundColor: backgroundColor || '',
                  }}
                >
                  <div className={classes.mediaWrapper}>
                    <StoryProgress
                      isStoryStarted={isStoryStarted}
                      isPause={isPause}
                      duration={DURATION_IN_SEC}
                      story={s}
                    />
                    <StoryHeader
                      story={s}
                      onSetOfferDetailsOpen={handleToggleOfferDetailsBottomSheet}
                    />
                    <StoryImage
                      onImageLoad={onImageLoad}
                      onStoryItemNavigation={handleStoryItemNavigation}
                      story={s}
                    />
                  </div>
                  <StoryTitle story={s} onClickEnroll={handleEnrollOffer} />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      {Object.keys(activeStory).length > 0 && (
        <StoryDetails
          isOfferDetailsOpen={isOfferDetailsOpen}
          onToggleOfferDetails={handleToggleOfferDetailsBottomSheet}
        />
      )}
    </>
  );
};

export default StoryApp;
