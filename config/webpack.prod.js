const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../app/js'),
  dist: path.join(__dirname, '../public'),
  css: path.join(__dirname, '../app/css')
}

module.exports = {
  devtool: 'source-map',
  entry: [PATHS.src],
  output: {
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      css: PATHS.css
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "presets": ["es2015", "react", "react-optimize"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1!postcss-loader')
      }
    ]
  },
  postcss: [
    require('postcss-cssnext')
  ]
};
