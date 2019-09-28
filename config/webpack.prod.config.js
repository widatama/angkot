const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackStylish = require('webpack-stylish');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
/* eslint-enable import/no-extraneous-dependencies */

const webpackConfig = require('./webpack.config');
const appConfig = require('./app.config');

webpackConfig.mode = 'production';
webpackConfig.stats = 'none';

webpackConfig.output = {
  path: path.resolve('', `./${appConfig.paths.dist.path}/`),
  publicPath: '',
  filename: `${appConfig.paths.dist.javascriptsPath}/${appConfig.bundleNames.js}`,
  chunkFilename: `${appConfig.paths.dist.javascriptsPath}/${appConfig.bundleNames.jsChunk}`,
};

webpackConfig.optimization = {
  minimizer: [new UglifyJsPlugin({ extractComments: 'all' })],
};

webpackConfig.plugins = (webpackConfig.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new OptimizeCSSPlugin({
    cssProcessorOptions: { discardComments: { removeAll: true } },
  }),
  new WebpackStylish(),
]);

module.exports = webpackConfig;
