const { merge } = require('webpack-merge');

const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const commonConfig = require('./webpack.common');

module.exports = () => {
  // merge default configuration with a chosen mode configuration
  return merge(commonConfig, process.env.NODE_ENV === 'development' ? devConfig : prodConfig);
};
