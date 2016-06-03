var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var pkg = require('./package.json');

const HOST = 'localhost';
const PORT = 9000;

var configPath = process.argv[2] || './webpack.config.js';
var config = require(configPath);

config.plugins.push(new webpack.HotModuleReplacementPlugin());

var server = new WebpackDevServer(
  webpack(config),
  config.devServer
);

server.listen(PORT, HOST, function (err) {

  if (err) {
    console.log(err);
  }

  console.log(`Listening at: http://${HOST}:${PORT}/webpack-dev-server/`);

});
