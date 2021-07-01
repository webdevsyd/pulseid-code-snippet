const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: '[name].css',
});

const MiniCssExtractPluginLoader = {
  loader: MiniCssExtractPlugin.loader,
};

const OptimizationConfig = {
  minimize: true,
  minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
};

module.exports = {
  mode: 'production',
  devtool: 'cheap-source-map',
  entry: {
    carousel: path.resolve(__dirname, './src/carousel/index-prod.jsx'),
    story: path.resolve(__dirname, './src/story/index-prod.jsx'),
  },
  module: {
    rules: [
      {
        // Refer: https://github.com/css-modules/css-modules/pull/65
        // Refer: .eslintrc.js file ("import/no-unresolved" rule)
        test: /\.(scss|css)$/,
        oneOf: [
          {
            // Loads CSS without any special processing. Reserved
            // for third-party CSS (i.e. from node_modules)
            resourceQuery: /^\?raw$/,
            use: [
              MiniCssExtractPluginLoader,
              {
                loader: require.resolve('css-loader'),
              },
            ],
          },
          {
            // Loads each CSS as module with unique localIdentName,
            // which prevents CSS pollution between app components.
            use: [
              {
                ...MiniCssExtractPluginLoader,
                options: {
                  publicPath: './',
                },
              },
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
    ],
  },
  plugins: [MiniCssExtractPluginConfig],
  optimization: OptimizationConfig,
};
