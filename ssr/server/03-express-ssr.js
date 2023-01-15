// nodejs代码

const express = require('express')
const Vue = require('vue')

// 获取渲染器实例
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer()

// 获取express实例
const server = express()

// 编写路由处理不同url请求
server.get('/', (req, res)=>{
    const app = new Vue({
        template: '<div>{{message}}</div>',
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