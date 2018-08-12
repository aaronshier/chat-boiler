const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CompressionPlugin = require('compression-webpack-plugin')
import { server, production } from  './src/config'
let browserConfig, serverConfig


if(production){
  console.log({production: true})
  browserConfig = {
    entry: './src/browser/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.production.min.js',
      publicPath: '/'
    },
    optimization: {
      minimize: true
    },
    mode: "production",
    module: {
      rules: [
        { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "true"
      }),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      
    ]
  }

  serverConfig = {
    entry: './src/server/index.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: __dirname,
      filename: 'server.js',
      publicPath: '/'
    },
    optimization: {
      minimize: true
    },
    module: {
      rules: [
        { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "false"
      })
    ]
  }

} else {
  console.log({production: false})
  browserConfig = {
    entry: './src/browser/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.production.min.js',
      publicPath: '/'
    },
    mode: "production",
    module: {
      rules: [
        { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "true"
      }),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
    ]
  }

  serverConfig = {
    entry: './src/server/index.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: __dirname,
      filename: 'server.js',
      publicPath: '/'
    },
    module: {
      rules: [
        { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "false"
      })
    ]
  }
}
module.exports = [ browserConfig, serverConfig ]