const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const merge = require('webpack-merge') // webpack合并工具
const baseConfig = require('./webpack.config.base')

let config

const devServer = {
  port: 8081,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true // 改了一个组件的代码，只重新加载该组件，不重新加载全部页面
}

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
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
  // import Vue from 'vue'
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HTMLPlugin({
      template: path.join(__dirname, 'template.html')
    })
  ]
})

module.exports = config
