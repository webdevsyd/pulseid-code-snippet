import React from 'react';

import { useOffers } from '../../offers-provider';

import EmptyState from './empty-state.svg';
import classes from './StoryEmpty.scss';

const StoryEmpty = () => {
  const { onFetchOffers, onResetOffers } = useOffers();
  return (
    <div className={classes.wrapper}>
      <div className={classes.bodyWrapper}>
        <EmptyState />
        <h1 className={classes.title}>Stories Aren’t Available Right Now</h1>
        <p className={classes.description}>
          This is may be because of a technical error that we’re working to get fixed. Try reloading
          this page.
        </p>
      </div>
      <div className={classes.footerWrapper}>
        <button
          type="button"
          className={classes.reloadButton}
          onClick={() => {
            onResetOffers();
            onFetchOffers({ page: 0 });
          }}
        >
          Reload Page
        </button>
        <button type="button" className={classes.backButton}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default StoryEmpty;
