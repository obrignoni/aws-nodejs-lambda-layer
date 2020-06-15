const path = require('path');
const serverlessConfig = require("./serverless.config.js");

const { externals, resolve } = serverlessConfig.webpackConfig();

// eslint-disable-next-line import/no-unresolved
module.exports = {
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.join(__dirname, '.webpack'),
  },
  mode: 'development',
  target: 'node',
  externals,
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
  }
};