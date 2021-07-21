import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConfigProvider from '../config-provider';
import * as authentication from '../authentication';

import CarouselApp from './carousel-app';

const App = ({ apiKey, apiSecret, externalUserId, initialize }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initialize({ apiKey, apiSecret, externalUserId });
    setIsLoading(false);
  }, []);

  return !isLoading ? (
    <ConfigProvider>
      <CarouselApp />
    </ConfigProvider>
  ) : null;
};

App.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string.isRequired,
  externalUserId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

  initialize: PropTypes.func.isRequired,
};

export default connect(null, {
  initialize: authentication.initialize,
})(App);
