var path = require('path');
var globEntry = require('webpack-glob-entry');

module.exports = {
  target: 'node',
  entry: globEntry('./src/**/*.handler.*'),
  module: {
    rules: [
      { 
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
};