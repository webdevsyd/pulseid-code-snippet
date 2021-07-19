/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
import StoryEnrolledPopup from '../story-enrolled-popup';
import { useOffers } from '../../offers-provider';

import { DURATION_IN_SEC } from './constants';
import classes from './StoryApp.scss';

const StoryApp = () => {
  const {
    swiperRef,
    activeStoryIndex,
    activeStoryItemIndex,
    activeStory,
    activeStoryItem,
    isPause,
    isStoryStarted,
    backgroundColor,
    onSetActiveStory,
    onSetActiveStoryItem,
    onPauseStory,
    onResumeStory,
    onImageLoad,
    onStoryItemNavigation,
    onSlideResetTransitionEnd,
    onSlidePrevTransitionEnd,
    onSlideNextTransitionEnd,
    onSliderMove,
  } = useStory();
  const {
    offers: storiesData,
    total,
    onSaveOfferAttribution,
    onShowEnrolledPopup,
    onFetchOffers,
    onFetchOffersAttribution,
    onFetchingInitialOffer,
    isFetchingInitialOffer,
    isShowEnrolledPopup,
    hasErrorOffers,
  } = useOffers();
  const [isOfferDetailsOpen, setIsOfferDetailsOpen] = useState(false);

  const handleToggleOfferDetailsBottomSheet = () => {
    if (isOfferDetailsOpen) {
      console.log('close bottom sheet');

      Promise.resolve().then(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          setIsOfferDetailsOpen(false);
          onResumeStory();
        });
      });
    } else if (!isOfferDetailsOpen && !isPause) {
      console.log('open bottom sheet');
      onPauseStory(activeStoryItem.id);
      setIsOfferDetailsOpen(true);
    } else if (!isOfferDetailsOpen && isPause) {
      console.log('open bottom sheet');
      setIsOfferDetailsOpen(true);
    }
  };

  const handleEnrollOffer = async id => {
    console.log('click enroll offer button');

    if (!isPause) {
      onPauseStory(activeStoryItem.id);
    }

    await onSaveOfferAttribution({ offerId: id, action: 'ENROLL' });

    onShowEnrolledPopup(true);

    setTimeout(() => {
      onShowEnrolledPopup(false);
      onResumeStory();
    }, 2000);
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
    (async () => {
      onFetchingInitialOffer(true);
      const urlParams = qs.parse(window.location.search);

      await onFetchOffersAttribution();

      if (urlParams.offer_id) {
        await onFetchOffers({ excludedOfferId: parseInt(urlParams.offer_id) });
      } else {
        await onFetchOffers();
      }

      onFetchingInitialOffer(false);
    })();
  }, []);

  useEffect(() => {
    const urlParams = qs.parse(window.location.search);

    if (urlParams.offer_id) {
      onSaveOfferAttribution({
        offerId: urlParams.offer_id,
        action: 'VIEW',
      });
    }
  }, []);

  if ((!isFetchingInitialOffer && storiesData.length === 0) || hasErrorOffers)
    return <StoryEmpty />;

  if (isFetchingInitialOffer) return <StoryLoader />;

  return (
    <>
      <Swiper
        className={classes.swiperWrapper}
        ref={swiperRef}
        onSlideResetTransitionEnd={swiper => onSlideResetTransitionEnd(swiper)}
        onSlidePrevTransitionEnd={onSlidePrevTransitionEnd}
        onSlideNextTransitionEnd={onSlideNextTransitionEnd}
        onSliderMove={swiper => onSliderMove(swiper)}
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
                      onStoryItemNavigation={onStoryItemNavigation}
                      story={s}
                    />
                  </div>
                  <StoryTitle key={s.id} story={s} onClickEnroll={handleEnrollOffer} />
                </div>
              </SwiperSlide>
            );
          })}
        {activeStoryIndex === storiesData.length - 1 && total !== storiesData.length && (
          <SwiperSlide>
            <StoryLoader />
          </SwiperSlide>
        )}
      </Swiper>
      {isShowEnrolledPopup && <StoryEnrolledPopup />}
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
