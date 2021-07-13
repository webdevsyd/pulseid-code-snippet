import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_BORDER_COLOR = '#ff9800';
const DEFAULT_BG_COLOR = '#ff9800';

const borderColor =
  typeof window.pulseConfig !== 'undefined'
    ? window.pulseConfig.borderColor || DEFAULT_BORDER_COLOR
    : DEFAULT_BORDER_COLOR;

const backgroundColor =
  typeof window.pulseConfig !== 'undefined'
    ? window.pulseConfig.backgroundColor || DEFAULT_BG_COLOR
    : DEFAULT_BG_COLOR;

const title = typeof window.pulseConfig !== 'undefined' ? window.pulseConfig.title || '' : '';

const subTitle = typeof window.pulseConfig !== 'undefined' ? window.pulseConfig.subTitle || '' : '';

const ConfigContext = React.createContext({});

const ConfigProvider = ({ children }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ConfigContext.Provider value={{ title, subTitle, borderColor, backgroundColor }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => React.useContext(ConfigContext);

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConfigProvider;
