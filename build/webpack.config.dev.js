'use strict'

const path = require('path')
const webpack = require('webpack')

const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: [
    './src/app.js'
  ],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
    publicPath: 'dist'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }, {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }, {
        test: /\.styl(us)?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader?paths=node_modules/bootstrap-4-stylus/bootstrap.styl']
      }, {
        test: /\.js$/,
        use: 'babel-loader'
      }, {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif|ico)(?:[?#].+)?$/,
        use: [{
          loader: 'file-loader'
        }]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ],

  node: {
    fs: 'empty',
    child_process: 'empty'
  }
}
