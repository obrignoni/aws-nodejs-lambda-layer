const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const serverlessConfig = require("./serverless.config.js");

const { entry, resolve, copyPluginConfig } = serverlessConfig.webpackLayerConfig();

// eslint-disable-next-line import/no-unresolved
module.exports = {
  entry,
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.join(__dirname, '.webpack'),
  },
  mode: 'development',
  target: 'node',
  resolve,
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        enforce: 'pre', // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        include: __dirname,
        use: [
          {
            loader: 'babel-loader'
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin(copyPluginConfig),
  ]
};