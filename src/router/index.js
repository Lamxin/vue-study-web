const Vue = require("vue")
// const app = Vue.createApp()
const vueRouter = require("vue-router");
const Home = {template: '<h1>这里是首页</h1>'}
const About = () => import('../view');
Vue.use(vueRouter);

module.exports = () => {
    return new vueRouter({
        mode:"history",
        routes:[
            {
                path:"/",
                component: Home,
                name:"home"
            },
            {
                path:"/about",
                component: About,
                name:"about"
            }
        ]
    })
}