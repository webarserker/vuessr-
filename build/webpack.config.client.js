const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPluins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
]

const devServer = {
          port: 8000,
          host: '127.0.0.1',
          overlay: {
            errors: true,
          },
          hot: true
        }

let config

if (isDev) {
  config = merge(baseConfig, {
      devtool: '#cheap-module-eval-source-map',
      module: {
        rules: [
          {
            test: /\.styl/,
            use: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ]
          }
        ]
      },
      devServer,
      plugins: defaultPluins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ])


  })

} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
      plugins: defaultPluins.concat([
          new ExtractPlugin('style.[contentHash:8].css'),
          new webpack.optimize.CommonsChunkPlugin({
              name: 'vendor'
          }),
          new webpack.optimize.CommonsChunkPlugin({
              name: 'runtime'
          })
      ])

  })



}

// {
//     loader: 'css-loader',
//         options: {
//     module: true,
//         localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
// }
// },

module.exports = config
