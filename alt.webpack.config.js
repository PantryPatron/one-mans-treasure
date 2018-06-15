var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader']
        }),
        test: /\.less$/,
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  plugins: [
     new ExtractTextPlugin({
     filename: '[name].[contenthash].css',
   }),
  ]
};