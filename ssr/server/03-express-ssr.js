// nodejs代码

const express = require('express')
const path = require('path')
const fs = require('fs')
const Vue = require('vue')
// 获取渲染器实例
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer()
// 获取express实例
const server = express()

// 编写路由处理不同url请求
server.get('*', (req, res)=>{
    // console.log(req.url)

    const template = req.url.substr(1) || 'index'
    const buffer = fs.readFileSync(path.join(__dirname, `${template}.html`))
    
    const app = new Vue({
        template: buffer.toString(),
        data(){
            return{
                message: 'vue ssr'
            }
        }
    })

    // 用渲染器渲染vue实例
    renderer.renderToString(app).then(html => {
        res.send(html) // 返回
    }).catch(err => {
        console.log(err)
    })  
})

server.listen(80, () => {
    console.log('server running!')
})