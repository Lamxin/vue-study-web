// 处理开发时服务端渲染情况
const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs') // 功能和node的fs大致相同，但不会把文件写入磁盘中
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')
const serverConfig = require('../../build/webpack.config.server')
const { Stats } = require('webpack')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if(err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.hasWarnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

const handleSSR = async (ctx) => {
  if(!bundle){
    ctx.body = 'wait a minute'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs')
  )

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
}
