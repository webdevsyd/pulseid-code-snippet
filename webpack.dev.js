const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const appConfig = require('./app.config');

const envConfig = {
  'process.env': {
    X_API_KEY: JSON.stringify(appConfig.X_API_KEY),
    X_API_SECRET: JSON.stringify(appConfig.X_API_SECRET),
    EXTERNAL_USER_ID: JSON.stringify(appConfig.EXTERNAL_USER_ID),
    PROXY_API_BASE: 'http://localhost:3006',
  },
};

module.exports = {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    compress: true,
    disableHostCheck: true,
  },
  entry: {
    carousel: path.resolve(__dirname, './src/carousel/index-dev.jsx'),
    story: path.resolve(__dirname, './src/story/index-dev.jsx'),
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        oneOf: [
          {
            // Loads library styles, but without localIdentName to
            resourceQuery: /^\?raw$/,
            use: [
              'style-loader',
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            use: [
              'style-loader',
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                  modules: {
                    localIdentName: '[name]__[local]__[hash:base64:5]',
                  },
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer()],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.DefinePlugin(envConfig)],
};
