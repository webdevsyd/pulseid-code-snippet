import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as configAction from '../config/actions';
import * as authenticationAction from '../authentication/actions';

import StoryApp from './story-app';

const App = ({ apiKey, apiSecret, externalUserId, config, initialize, onSetConfig }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onSetConfig(config);
    initialize({ apiKey, apiSecret, externalUserId });
    setIsLoading(false);
  }, []);

  return !isLoading ? <StoryApp /> : null;
};

App.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string.isRequired,
  externalUserId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  config: PropTypes.shape({}).isRequired,

  onSetConfig: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
};

export default connect(null, {
  initialize: authenticationAction.initialize,
  onSetConfig: configAction.setConfig,
})(App);
