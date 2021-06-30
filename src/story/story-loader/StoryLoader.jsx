import React from 'react';

import classes from './StoryLoader.scss';

const StoryLoading = () => (
  <div className={classes.wrapper}>
    <div className={classes.mediaWrapper}>
      <div className={classes.headerWrapper}>
        <div className={classes.merchantImageWrapper} />
        <div className={classes.merchantNameWrapper} />
      </div>
      <div className={classes.bodyWrapper}>
        <div className={classes.imageWrapper} />
      </div>
    </div>
    <div className={classes.footerWrapper}>
      <div className={classes.titleWrapper} />
      <div className={classes.dateWrapper} />
      <div className={classes.otherWrapper} />
      <div className={classes.buttonWrapper} />
    </div>
  </div>
);

export default StoryLoading;
