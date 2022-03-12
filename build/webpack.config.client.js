const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const merge = require('webpack-merge') // webpack合并工具
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')

let config

const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    hot: true, // 改了一个组件的代码，只重新加载该组件，不重新加载全部页面
}

if(isDev) {
    config = merge(baseConfig,{
        module:{
            rules: [{
                test: /\.styl/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            module: true, // 加密class的方法
                            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]': '[hash:base64:5]',
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
        devtool : '#cheap-module-eval-source-map', // 浏览器调试
        devServer,
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"development"'
                }
            }),
            new HTMLPlugin()
        ]
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
            new HTMLPlugin()
        ]
    })
}

module.exports = config
