const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const merge = require('webpack-merge') // webpack合并工具
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
let config

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  historyApiFallback:{ // 解决前端加载路由，在浏览器回车会报错的问题
    index: '/index.html'
  },
  hot: true // 改了一个组件的代码，只重新加载该组件，不重新加载全部页面
}

if (isDev) {
  config = merge(baseConfig, {
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true, // 加密class的方法
              localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    devtool: '#cheap-module-eval-source-map', // 浏览器调试
    devServer,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      }),
      new HTMLPlugin(),
      new VueClientPlugin()
    ]
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [{
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }]
    },
    plugins: [
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
      }),
      new VueClientPlugin()
    ]
  })
}

module.exports = config
