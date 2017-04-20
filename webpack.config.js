var path = require('path'); //подключение модуля nodejs для работы с путями
var webpack = require('webpack'); //подключение модуля webpack
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CssSourcemapPlugin = require('css-sourcemaps-webpack-plugin');

module.exports = {
   entry: {
      app: path.join(__dirname, 'src', 'main')
   },
   output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
   },
   module: {
      rules: [{
         test: /\.jsx?$/,
         exclude: /node_modules/,
         use: [{
            loader: 'babel-loader',
            options: {
               presets: [
                  'react',
                  'es2015',
                  'stage-0'
               ],
               plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
            }
         }]
      }, {
         test: /\.html$/,
         loader: 'html-loader'
      },
          /*  {
           test: /\.css$/,
           loader: 'style-loader!css-loader'
           },
           */
         {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
               fallbackLoader: 'style-loader',
               loader: ['css-loader']
            }),
         }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
               fallbackLoader: 'style-loader',
               loader: ['css-loader', 'sass-loader', 'resolve-url-loader']
            }),
         },

         {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
               'loader': 'url-loader',
               'options': {
                  limit: 10000,
                  mimetype: 'application/font-woff',
                  name: './fonts/[name].[ext]'
               }
            }]
         }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
               'loader': 'url-loader',
               'options': {
                  limit: 10000,
                  mimetype: 'application/font-woff2',
                  name: './fonts/[name].[ext]'
               }
            }]
         }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
               'loader': 'url-loader',
               'options': {
                  limit: 10000,
                  mimetype: 'application/octet-stream',
                  name: './fonts/[name].[ext]'
               }
            }]
         }, {
            test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
               'loader': 'url-loader',
               'options': {
                  limit: 10000,
                  mimetype: 'application/font-otf',
                  name: './fonts/[name].[ext]'
               }
            }]
         }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
               'loader': 'file-loader',
               'options': {
                  name: './fonts/[name].[ext]'
               }
            }]
         }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
               'loader': 'url-loader',
               'options': {
                  limit: 10000,
                  mimetype: 'image/svg+xml',
                  name: './fonts/[name].[ext]'
               }
            }]
         }, {
            test: /\.(png|jpg|jpeg)$/,
            use: [{
               'loader': 'file-loader',
               'options': {
                  name: './img/[name].[ext]'
               }
            }]
         }]
   },
   resolve: {
      extensions: ['.js', '.jsx', '.css']
   },
   target: 'web',
   devtool: 'source-map',
   plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
         template: path.join(__dirname, 'src', 'index.html'),
         filename: path.join(__dirname, 'dist', 'index.html')
      }),
      new webpack.ProvidePlugin({
         React: 'react',
         axios: 'axios',
         ReactDOM: 'react-dom',
      }),
      new BrowserSyncPlugin({
         host: 'localhost',
         port: 3000,
         server: {
            baseDir: ['dist']
         }
      }),
      new CssSourcemapPlugin(),
      new ExtractTextPlugin({
         allChunks: true,
         filename: 'style.css'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
      new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
      new CleanWebpackPlugin(['dist'])
   ]
};