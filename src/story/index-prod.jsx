import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line import/no-unresolved
import '../index.css?raw';
// eslint-disable-next-line import/no-unresolved
import '../fonts/fonts.css?raw';

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
    // eslint-disable-next-line react/jsx-filename-extension
    ReactDOM.render(<App xApiKey={init.xApiKey} xApiSecret={init.xApiSecret} externalUserId={init.euid} />, document.querySelector(init.selector));
  },
  unmount() {
    ReactDOM.unmountComponentAtNode(document.querySelector(init.selector));
  },
};
