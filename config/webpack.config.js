const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const projectConf = require('./app.config');
const debug = require('debug')('app:config:webpack');

const argv = require('yargs').argv;
// ----------------------------------
// Webpack4  Mode , Init
// ----------------------------------
const MODE = argv.mode || process.env.NODE_ENV || 'development';

const __DEV__ = MODE === 'development';

const {
  PATH,
  COMPILE_PUBLIC_PATH,
  SERVER_HOST,
  SERVER_PORT
} = projectConf;

if (argv.server) {
  debug(`Webpack Serve is running at ${SERVER_HOST}:${SERVER_PORT}.`);
}

const webpackConfig = {

  target: 'web',

  mode: MODE,

  entry: {
    app: path.join(PATH.APP, 'index.js'),
  },

  output: {
    filename: `[name].[${__DEV__ ? 'hash' : 'chunkhash'}].js`,
    chunkFilename: `[name].[${__DEV__ ? 'hash' : 'chunkhash'}].js`,
    path: PATH.DIST,
    publicPath: COMPILE_PUBLIC_PATH
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            context: PATH.ROOT,
            configFile: path.join(PATH.ROOT, 'tsconfig.json')
          }
        }
      },
      {
        test: /\.css|scss$/,
        use: [
          __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [
      'node_modules',
      PATH.APP
    ],
    alias: {
      components: path.resolve(PATH.APP, 'components/')
    },
    symlinks: false
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: path.resolve(PATH.PUBLIC, './index.html'),
      favicon: path.resolve(PATH.PUBLIC, './favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),

    // copy static resource
    new CopyWebpackPlugin([
      {from: PATH.PUBLIC, to: PATH.DIST}
    ])
  ]

};


if (__DEV__) {

  webpackConfig.devtool = '#source-map';

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );

  webpackConfig.devServer =  {
    contentBase: PATH.DIST,
    historyApiFallback: true,
    hot: true,
    // logLevel: 'warn',
    host: SERVER_HOST,
    port: SERVER_PORT,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        pathRewrite: {'^/api': '/'},
        secure: false
      }
    }
  };

}

if (!__DEV__) {

  webpackConfig.plugins.push(
    new CleanWebpackPlugin(['dist'], {
      root: PATH.ROOT,
      verbose: false
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[chunkhash].css',
    }),

    // show progress of compile
    new webpack.ProgressPlugin(),

    // Bundle Analysis
    // new BundleAnalyzerPlugin.BundleAnalyzerPlugin()
  );

  webpackConfig.optimization = {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      cacheGroups: {
        default: {
          name: 'bundle',
          priority: -30,
        },
        common: {
          test: /[\\/]src\/components[\\/]/,
          name: 'common',
          priority: -20,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -10,
        }

      }
    }
  };
}

module.exports = webpackConfig;
