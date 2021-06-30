/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const { v4: uuid } = require('uuid');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  module: {
    rules: [
      {
        test: /\.(gif|png|ico|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'img-loader',
            options: {
              name: '[name]_[hash:5].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /^\?raw/,
            use: [
              {
                loader: 'file-loader',
              },
              {
                loader: 'img-loader',
                options: {
                  name: '[name]_[hash:5].[ext]',
                },
              },
            ],
          },
          {
            use: [
              'babel-loader',
              {
                loader: 'react-svg-loader',
                options: {
                  svgo: {
                    plugins: [
                      { removeTitle: false },
                      {
                        cleanupIDs: {
                          prefix: {
                            toString() {
                              return `id-${uuid()}`;
                            },
                          },
                        },
                      },
                    ],
                    floatPrecision: 2,
                  },
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        /* eslint-disable no-useless-escape */
        test: /\.(jsx|js)?$/,
        include: filePath => {
          const includedPackages = ['@pulse'];
          return includedPackages.some(
            packageName => filePath.lastIndexOf(packageName) > filePath.lastIndexOf('node_modules')
          );
        },
        /* eslint-enable */
        use: ['babel-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    library: 'CodeSnippet',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'carousel.html',
      template: path.resolve(__dirname, './src/carousel/index.html'),
      chunks: ['carousel'],
      inject: false,
      hash: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'story.html',
      template: path.resolve(__dirname, './src/story/index.html'),
      chunks: ['story'],
      inject: false,
      hash: true,
    }),
  ],
};
