import React from 'react';

import classes from './CarouselLoader.scss';

const CarouselLoader = () => (
  <>
    <div className={classes.wrapper}>
      <div className={classes.title} />
      <div className={classes.info}>
        <div className={classes.imageContainer}>
          <div className={classes.image} />
        </div>
        <span className={classes.company} />
      </div>
    </div>
    <div className={classes.wrapper}>
      <div className={classes.title} />
      <div className={classes.info}>
        <div className={classes.imageContainer}>
          <div className={classes.image} />
        </div>
        <span className={classes.company} />
      </div>
    </div>
    <div className={classes.wrapper}>
      <div className={classes.title} />
      <div className={classes.info}>
        <div className={classes.imageContainer}>
          <div className={classes.image} />
        </div>
        <span className={classes.company} />
      </div>
    </div>
  </>
);

export default CarouselLoader;
