import Vue from "vue"
import VueRouter from "@/KRouter/kvue-router"
import Home from "@/views/Home.vue"
// import Login from "@/views/Login.vue"
Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        // component: import('@/views/Login.vue'), // 错误
        component: () => import('@/views/Login.vue'),
        children: [
            {
                path: '/login/info',
                component: {render(h){ return h('div', 'info page')}},
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router