// nodejs代码

const express = require('express')
const path = require('path')
const fs = require('fs')
const Vue = require('vue')

// 获取绝对路由函数
function resolve(dir) {
    return path.resolve(__dirname, dir)
}

// 获取渲染器实例
const { createBundleRenderer } = require('vue-server-renderer')

// 参数1服务端bundle
const bundle = require(resolve('../dist/server/vue-ssr-server-bundle.json'))
const template = fs.readFileSync(resolve("../public/index.html"), "utf-8");
const clientManifest = require(resolve("../dist/client/vue-ssr-client-manifest.json"));

const renderer = createBundleRenderer(bundle,{
    runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
    template, // 宿主文件
    clientManifest // 客户端清单
})

// 获取express实例
const server = express()

// 静态资源处理
server.use(express.static(resolve('../dist/client'), {index: false}))

// 编写路由处理不同url请求
server.get('*', async (req, res)=>{
   // 构造上下文
    const context = {
        title: 'ssr test',
        url: req.url
    }

    try {
        const html = await renderer.renderToString(context)
        // 响应给前端
        res.send(html)
    } catch (error) {
        res.status(500).send('服务器渲染错误')
    }
})

server.listen(80, () => {
    console.log('server running!')
})