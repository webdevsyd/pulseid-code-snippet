import React from 'react';
import ReactDOM from 'react-dom';
import icons from '@pulse/ui-lib/src/components/icons';

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

// Setup FontAwesome icon library so we can use it anywhere in the app.
icons.setup();

ReactDOM.render(
  <App
    xApiKey={process.env.X_API_KEY}
    xApiSecret={process.env.X_API_SECRET}
    externalUserId={1231}
  />,
  document.getElementById('app')
);
