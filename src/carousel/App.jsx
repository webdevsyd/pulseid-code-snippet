import React from 'react';
import PropTypes from 'prop-types';

import AuthenticationProvider from '../authentication-provider';
import OffersProvider from '../offers-provider';
import ConfigProvider from '../config-provider';

import CarouselApp from './carousel-app';

const App = ({ xApiKey, xApiSecret, externalUserId }) => (
  <AuthenticationProvider xApiKey={xApiKey} xApiSecret={xApiSecret} externalUserId={externalUserId}>
    <OffersProvider>
      <ConfigProvider>
        <CarouselApp />
      </ConfigProvider>
    </OffersProvider>
  </AuthenticationProvider>
);

App.propTypes = {
  xApiKey: PropTypes.string.isRequired,
  xApiSecret: PropTypes.string.isRequired,
  externalUserId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default App;
