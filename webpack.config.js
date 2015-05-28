var path = require('path');
var JS_PATH = __dirname + '/app/assets/javascripts';

module.exports = {
  entry: JS_PATH + '/main.js',
  output: {
    path: JS_PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    root: path.resolve(JS_PATH),
    extensions: ['', '.js']
  }
};
