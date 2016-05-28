const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = require('./env')

const PATHS = {
  src: path.join(__dirname, '../app/js'),
  dist: path.join(__dirname, '../public'),
  css: path.join(__dirname, '../app/css')
}

module.exports = {
  devtool: 'eval',
  entry: ['babel-polyfill', PATHS.src],
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
      API_HOST: JSON.stringify(env.development.api)
    }),
    new CleanPlugin(['index.html', 'bundle.js', 'bundle.js.map', 'style.css', 'style.css.map'], PATHS.dist),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ],
  devServer: {
    port: 3000,
    stats: 'errors-only',
    historyApiFallback: true,
    outputPath: PATHS.dist
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "presets": ["es2015", "react", "stage-2"],
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  },
  postcss: [
    require('postcss-cssnext')
  ]
};
