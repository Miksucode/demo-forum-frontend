var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * This is the Webpack configuration file for local development. It contains
 * local-specific configuration such as the React Hot Loader, as well as:
 *
 * - The entry point of the application
 * - Where the output file should be
 * - Which loaders to use on what files to properly transpile the source
 *
 * http://webpack.github.io/docs/configuration.html
 */
module.exports = {

  // Efficiently evaluate modules with source maps
  devtool: 'eval',

  // Set entry point to ./src/main and include necessary files for hot load
  entry:  [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/main'
  ],

  // This will not actually create a bundle.js file in ./build. It is used
  // by the dev server for dynamic hot loading.
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  // Necessary plugins for hot load
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },

  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },

  // Additional plugins for CSS post processing using postcss-loader
  postcss: [
    require('autoprefixer'), // Automatically include vendor prefixes
    require('postcss-nested'), // Enable nested rules, like in Sass
    require('postcss-import'), // Enable @import
    require('postcss-css-variables') // Enables future-proof way of using CSS variables
  ]
}
