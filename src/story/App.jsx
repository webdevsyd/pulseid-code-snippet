import React from 'react';
import PropTypes from 'prop-types';

import AuthenticationProvider from '../authentication-provider';
import OffersProvider from '../offers-provider';

import StoryProvider from './story-provider';
import StoryApp from './story-app';

const App = ({ xApiKey, xApiSecret, externalUserId }) => (
  <AuthenticationProvider xApiKey={xApiKey} xApiSecret={xApiSecret} externalUserId={externalUserId}>
    <OffersProvider>
      <StoryProvider>
        <StoryApp />
      </StoryProvider>
    </OffersProvider>
  </AuthenticationProvider>
);

App.propTypes = {
  xApiKey: PropTypes.string.isRequired,
  xApiSecret: PropTypes.string.isRequired,
  externalUserId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default App;
