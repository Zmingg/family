const path = require('path');
const debug = require('debug')('app:config:project');

debug('Creating default configuration.');

const config = {

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  SERVER_HOST : '0.0.0.0',
  SERVER_PORT : 8793,

  // ----------------------------------
  // Project Paths
  // ----------------------------------
  PATH: {
    CONFIG: path.resolve(__dirname, '../config'),
    ROOT: path.resolve(__dirname, '../'),
    APP: path.resolve(__dirname, '../src'),
    DIST: path.resolve(__dirname, '../dist'),
    PUBLIC: path.resolve(__dirname, '../public'),
  },

  // ----------------------------------
  // Webpack PublicPath
  // ----------------------------------
  COMPILE_PUBLIC_PATH: '/',

};

module.exports = config;
