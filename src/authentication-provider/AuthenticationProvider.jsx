import React from 'react';
import PropTypes from 'prop-types';

const AuthenticationContext = React.createContext({});

const AuthenticationProvider = ({ xApiKey, xApiSecret, externalUserId, ...rest }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AuthenticationContext.Provider value={{ xApiKey, xApiSecret, externalUserId }} {...rest} />
  );
};

export const useAuthentication = () => React.useContext(AuthenticationContext);

AuthenticationProvider.propTypes = {
  xApiKey: PropTypes.string.isRequired,
  xApiSecret: PropTypes.string.isRequired,
  externalUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AuthenticationProvider;
