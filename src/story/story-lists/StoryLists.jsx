import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import 'swiper/swiper.min.css?raw';
import ColorThief from 'colorthief';
import queryString from 'query-string';

import StoryEmpty from '../story-empty';
import StoryLoader from '../story-loader';
import StoryProgress from '../story-progress';
import StoryHeader from '../story-header';
import StoryImage from '../story-image';
import StoryTitle from '../story-title';
import * as storyTitleActions from '../story-title/actions';
import StoryDetails from '../story-details';
import * as storyDetailsActions from '../story-details/actions';
import * as storyDetailsSelectors from '../story-details/selectors';
import StoryEnrolledPopup from '../story-enrolled-popup';
import * as storyEnrolledPopupActions from '../story-enrolled-popup/actions';
import * as storyEnrolledPopupSelectors from '../story-enrolled-popup/selectors';

import * as selectors from './selectors';
import * as actions from './actions';
import classes from './StoryLists.scss';

const colorThief = new ColorThief();

const StoryLists = ({
  activeStory,
  activeStoryIndex,
  activeStoryItem,
  activeStoryItemIndex,

  offers,
  isFetching,
  isPause,
  isStoryStarted,
  isSwiping,
  isShowEnrolledPopup,
  isDetailsPopupOpen,
  hasRefetched,
  pauseStoryId,
  backgroundColor,
  duration,
  startTime,
  total,
  currentPage,
  enrolledOffers,
  durationInSeconds,

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
  initialize,
  onFetchOffers,
  onSetHasRefetched,
  onSetIsShowPopup,
  onSaveOfferAttribution,
  onSetEnrolledOffers,
  onSetIsDetailsPopupOpen,
  onResetOffers,
}) => {
  const swiperRef = useRef(null);

  const handleNewActiveStory = storyIndex => {
    onResetPause();

    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        onSetActiveStoryIndex(storyIndex);
        onSetActiveStoryItemIndex(0);
        onSetActiveStory(offers[storyIndex]);
        onSetActiveStoryItem(offers[storyIndex].images[0]);
      });
    });
  };

  const handleNewActiveStoryItem = storyItemIndex => {
    onSetActiveStoryItemIndex(storyItemIndex);
    onSetActiveStoryItem(activeStory.images[storyItemIndex]);
  };

  const handleSetNewActiveStory = storyIndex => {
    onSaveOfferAttribution({ offerId: offers[storyIndex].id, action: 'VIEW' });

    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        onSetIsStoryStarted(false);
        onSetIsSwiping(false);
      });
    });

    handleNewActiveStory(storyIndex);

    onResetDuration();
  };

  const handleNextStory = () => {
    if (activeStoryIndex < offers.length - 1) {
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
          onResetDuration();
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
          onResetDuration();
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
            onSetIsStoryStarted(false);
            handleNextStoryImage(); // Next Item in the Story
          });
        });
      } else {
        console.log('next story from timer');
        swiperRef.current.swiper.slideNext();
      }
    }, duration);
  };

  const handleResumeStory = () => {
    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(() => {
        onResetPause();
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
          onSetDuration(duration - (Date.now() - startTime));
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
        onSetStartTime(Date.now());
        onSetIsStoryStarted(true); // This will identify if the story animation will start
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

    onSetBackgroundColor(`rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`);
  };

  const handleSlideResetTransitionEnd = swiper => {
    // Trigger when going to the next slide but decided not any more :D
    onResetPause();
    onSetIsSwiping(false);

    // Trigger when the user swipe back even though the current story is the first one
    if (swiper.activeIndex === 0 && swiper.isBeginning) {
      handleResumeStory();
    } else if (swiper.activeIndex === offers.length - 1) {
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

    if (activeStoryIndex === offers.length - 1) {
      console.log('refetch offers');
      onSetHasRefetched(false);
      await onFetchOffers({ page: currentPage + 1 });

      onSetHasRefetched(true);
    } else {
      handleNextStory();
    }
  };

  const handleSliderMove = swiper => {
    // Trigger when user starts to swipe
    if (!isSwiping) {
      console.log('onSlideMove');
      onSetIsSwiping(true);
      handlePauseStory(offers[swiper.activeIndex].images[activeStoryItemIndex].id);
    }
  };

  const handleEnrollOffer = async id => {
    console.log('click enroll offer button');

    if (!isPause) {
      handlePauseStory(activeStoryItem.id);
    }

    try {
      await onSaveOfferAttribution({ offerId: id, action: 'ENROLL' });
      onSetEnrolledOffers([...enrolledOffers, id]);
      onSetIsShowPopup(true);

      setTimeout(() => {
        onSetIsShowPopup(false);
        handleResumeStory();
      }, 2000);
    } catch (e) {
      alert(e);
    }
  };

  const handleToggleOfferDetailsBottomSheet = () => {
    if (isDetailsPopupOpen) {
      console.log('close bottom sheet');

      Promise.resolve().then(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          onSetIsDetailsPopupOpen(false);
          handleResumeStory();
        });
      });
    } else if (!isDetailsPopupOpen && !isPause) {
      console.log('open bottom sheet');
      handlePauseStory(activeStoryItem.id);
      onSetIsDetailsPopupOpen(true);
    } else if (!isDetailsPopupOpen && isPause) {
      console.log('open bottom sheet');
      onSetIsDetailsPopupOpen(true);
    }
  };

  useEffect(() => {
    if (Object.keys(activeStory).length === 0 && offers.length > 0) {
      console.log('SET ACTIVE STORY');

      Promise.resolve().then(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          onSetActiveStory(offers[activeStoryIndex]);

          if (offers[activeStoryIndex].images.length > 0) {
            onSetActiveStoryItem(offers[activeStoryIndex].images[activeStoryItemIndex]);
          }
        });
      });
    }
  }, [offers]);

  useEffect(() => {
    (async () => {
      const urlParams = queryString.parse(window.location.search);
      await initialize(urlParams.offer_id);
    })();
  }, []);

  useEffect(() => {
    if (hasRefetched && offers.length > 0) {
      console.log('next story after refetching offers', offers);
      handleNextStory();
    }
  }, [hasRefetched, offers]);

  if (!isFetching && offers.length === 0)
    return <StoryEmpty onFetchOffers={onFetchOffers} onResetOffers={onResetOffers} />;

  if (isFetching) return <StoryLoader />;

  const showLoadingPlaceholder = activeStoryIndex === offers.length - 1 && total !== offers.length;

  // touchRatio: when set to 0 This will disable swiping when the loading placeholder is display
  return (
    <>
      <Swiper
        className={classes.swiperWrapper}
        ref={swiperRef}
        touchRatio={showLoadingPlaceholder ? 0 : 1}
        onSlideResetTransitionEnd={swiper => handleSlideResetTransitionEnd(swiper)}
        onSlidePrevTransitionEnd={handleSlidePrevTransitionEnd}
        onSlideNextTransitionEnd={handleSlideNextTransitionEnd}
        onSliderMove={swiper => handleSliderMove(swiper)}
      >
        {Object.keys(activeStory).length > 0 &&
          offers.map(s => {
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
                      duration={durationInSeconds}
                      activeStoryItem={activeStoryItem}
                      activeStoryItemIndex={activeStoryItemIndex}
                      pauseStoryId={pauseStoryId}
                      story={s}
                    />
                    <StoryHeader
                      story={s}
                      onSetIsDetailsPopupOpen={handleToggleOfferDetailsBottomSheet}
                    />
                    <StoryImage
                      onImageLoad={handleImageLoad}
                      onStoryItemNavigation={handleStoryItemNavigation}
                      activeStory={activeStory}
                      activeStoryItem={activeStoryItem}
                      onSetIsPause={onSetIsPause}
                      story={s}
                    />
                  </div>
                  <StoryTitle
                    key={s.id}
                    enrolledOffers={enrolledOffers}
                    story={s}
                    onClickEnroll={handleEnrollOffer}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        {showLoadingPlaceholder && (
          <SwiperSlide>
            <StoryLoader />
          </SwiperSlide>
        )}
      </Swiper>
      {isShowEnrolledPopup && <StoryEnrolledPopup />}
      {Object.keys(activeStory).length > 0 && (
        <StoryDetails
          activeStory={activeStory}
          isOfferDetailsOpen={isDetailsPopupOpen}
          onToggleOfferDetails={handleToggleOfferDetailsBottomSheet}
        />
      )}
    </>
  );
};

StoryLists.defaultProps = {
  activeStoryIndex: null,
  activeStoryItemIndex: null,
  activeStory: {},
  activeStoryItem: {},
  startTime: null,
  enrolledOffers: [],
};

StoryLists.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    })
  ).isRequired,

  isFetching: PropTypes.bool.isRequired,

  activeStory: PropTypes.shape({
    id: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  activeStoryItem: PropTypes.shape({
    id: PropTypes.string,
  }),

  enrolledOffers: PropTypes.arrayOf(PropTypes.number),

  activeStoryIndex: PropTypes.number,
  activeStoryItemIndex: PropTypes.number,
  isPause: PropTypes.bool.isRequired,
  isStoryStarted: PropTypes.bool.isRequired,
  isSwiping: PropTypes.bool.isRequired,
  isShowEnrolledPopup: PropTypes.bool.isRequired,
  isDetailsPopupOpen: PropTypes.bool.isRequired,
  hasRefetched: PropTypes.bool.isRequired,
  pauseStoryId: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  startTime: PropTypes.number,
  total: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  durationInSeconds: PropTypes.number.isRequired,

  onSetActiveStory: PropTypes.func.isRequired,
  onSetActiveStoryIndex: PropTypes.func.isRequired,
  onSetActiveStoryItem: PropTypes.func.isRequired,
  onSetActiveStoryItemIndex: PropTypes.func.isRequired,
  onSetBackgroundColor: PropTypes.func.isRequired,
  onSetIsStoryStarted: PropTypes.func.isRequired,
  onSetIsPause: PropTypes.func.isRequired,
  onSetPauseStoryId: PropTypes.func.isRequired,
  onSetStartTime: PropTypes.func.isRequired,
  onSetDuration: PropTypes.func.isRequired,
  onResetDuration: PropTypes.func.isRequired,
  onResetPause: PropTypes.func.isRequired,
  onSetIsSwiping: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  onFetchOffers: PropTypes.func.isRequired,
  onSetHasRefetched: PropTypes.func.isRequired,
  onSetIsShowPopup: PropTypes.func.isRequired,
  onSaveOfferAttribution: PropTypes.func.isRequired,
  onSetEnrolledOffers: PropTypes.func.isRequired,
  onSetIsDetailsPopupOpen: PropTypes.func.isRequired,
  onResetOffers: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    isFetching: selectors.isFetching(state),
    offers: selectors.getOffers(state),
    total: selectors.getTotal(state),
    currentPage: selectors.getCurrentPage(state),
    hasRefetched: selectors.hasRefetched(state),
    isShowEnrolledPopup: storyEnrolledPopupSelectors.isShowPopup(state),
    enrolledOffers: selectors.getEnrolledOffers(state),
    isDetailsPopupOpen: storyDetailsSelectors.isDetailsPopupOpen(state),
  }),
  {
    initialize: actions.initialize,
    onFetchOffers: actions.fetchOffers,
    onSetHasRefetched: actions.setHasRefetched,
    onSetIsShowPopup: storyEnrolledPopupActions.setIsShowPopup,
    onSaveOfferAttribution: storyTitleActions.saveOfferAttribution,
    onSetEnrolledOffers: actions.setEnrolledOffers,
    onSetIsDetailsPopupOpen: storyDetailsActions.setIsDetailsPopupOpen,
    onResetOffers: actions.resetOffers,
  }
)(StoryLists);
