import React from 'react';
import ReactDOM from 'react-dom';
import icons from '@pulse/ui-lib/src/components/icons';
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

// Setup FontAwesome icon library so we can use it anywhere in the app.
icons.setup();

ReactDOM.render(
  <Provider store={store}>
    <App
      apiKey={process.env.X_API_KEY}
      apiSecret={process.env.X_API_SECRET}
      externalUserId={process.env.EXTERNAL_USER_ID}
      config={{
        backgroundColor: '#ff9800',
        borderColor: '#ff9800',
        title: 'Your Offers',
        subTitle: 'Lorem Ipsum sit dolora met',
      }}
    />
  </Provider>,
  document.getElementById('app')
);
