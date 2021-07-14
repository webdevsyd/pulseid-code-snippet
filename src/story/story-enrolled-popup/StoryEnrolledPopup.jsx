import React from 'react';

import EnrollIcon from './icon-enrolled.svg';
import classes from './StoryEnrolledPopup.scss';

const StoryEnrolledPopup = () => (
  <div className={classes.wrapper}>
    <div className={classes.popup}>
      <EnrollIcon />
      <span className={classes.text}>Enrolled</span>
    </div>
  </div>
);

export default StoryEnrolledPopup;
