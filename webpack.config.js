'use strict';

const DEV = process.env.NODE_ENV !== 'production';

let entry = {
  app: ['./src/client/main.js']
};

if (DEV) {
  entry.app.push('webpack-dev-server/client?http://localhost:9000');
  entry.app.push('webpack/hot/dev-server');
}

const config = {
  entry: entry,
  debug: DEV,
  devtool: DEV ? 'inline-source-map' : false,
  output: {
    path: __dirname + '/build',
    publicPath: 'public',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/public',
    hot: true,
    noInfo: false,
    inline: true,
    stats: { colors: true }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: []
};

module.exports = config;
