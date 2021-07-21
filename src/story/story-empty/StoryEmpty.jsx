import React from 'react';
import PropTypes from 'prop-types';

import EmptyState from './empty-state.svg';
import classes from './StoryEmpty.scss';

const StoryEmpty = ({ onFetchOffers, onResetOffers }) => {
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
        <button
          type="button"
          className={classes.backButton}
          onClick={() => {
            if (typeof PulseiD !== 'undefined') {
              // eslint-disable-next-line no-undef
              PulseiD.onCancel();
            }
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

StoryEmpty.propTypes = {
  onFetchOffers: PropTypes.func.isRequired,
  onResetOffers: PropTypes.func.isRequired,
};

export default StoryEmpty;
