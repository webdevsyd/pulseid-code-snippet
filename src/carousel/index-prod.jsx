import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import '../index.css?raw';
// eslint-disable-next-line import/no-unresolved
import '../fonts/fonts.css?raw';
import store from '../app/store';

import App from './App';

// WebFont.load({
//   custom: {
//     families: ['SF Pro Display:400,500,600', 'SF Pro Text:400', 'sans-serif'],
//     urls: ['https://cdn.pulseid.com/artifacts/styles/fonts/fonts.css'],
//   },
// });

let init = null;

export default {
  config: config => {
    init = config;
  },
  render: () => {
    ReactDOM.render(
      <Provider store={store}>
        <App
          apiKey={init.xApiKey}
          apiSecret={init.xApiSecret}
          externalUserId={init.euid}
          config={init.config}
        />
      </Provider>,
      document.querySelector(init.selector)
    );
  },
  unmount() {
    ReactDOM.unmountComponentAtNode(document.querySelector(init.selector));
  },
};
