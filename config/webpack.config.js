const path = require('path');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');

const appConfig = require('./app.config');

const environment = process.env.NODE_ENV;

const htmlWebpackPluginConfig = {
  title: appConfig.title,
  template: `${appConfig.paths.src.templatePath}/index.pug`,
  environment,
};

if (environment !== 'development') {
  htmlWebpackPluginConfig.excludeChunks = ['dev'];
  htmlWebpackPluginConfig.excludeAssets = [/dev/, /appcss.*.js/];
} else {
  htmlWebpackPluginConfig.excludeAssets = [/appcss.*.js/, /devcss.*.js/];
}

module.exports = {
  context: path.resolve('', `./${appConfig.paths.src.path}`),
  entry: {
    app: ['./javascripts/main.jsx', './stylesheets/app.css'],
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  postcssImport({
                    path: ['node_modules', './src'],
                  }),
                  postcssPresetEnv,
                  postcssNested,
                ];
              },
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
              plugins: ['react-hot-loader/babel'],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web',
  plugins: [
    new MiniCSSExtractPlugin({
      filename: `${appConfig.paths.dist.stylesheetsPath}/${appConfig.bundleNames.css}`,
    }),
    new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    new HtmlWebpackExcludeAssetsPlugin(),
  ],
};
