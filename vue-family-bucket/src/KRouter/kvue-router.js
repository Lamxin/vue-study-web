let Vue
// 1、实现一个插件：挂载$router
class KVueRouter {
    constructor(options){
        this.$options = options

        // 将current置为响应式数据
        // 利用Vue提供的defineReactive做响应化
        // 这样将来current变化时，依赖的组件会重新render
        // Vue.util.defineReactive(this, 'current', '/')

        this.current = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'matched', [])
        // match方法可以递归遍历路由表，获得匹配关系数组
        this.match()
        // 等同于
        // this.app = new Vue({
        //     data() {
        //         return {
        //             current: '/'
        //         }
        //     }
        // })
        // 然后用this.app.current访问

        window.addEventListener('hashchange', ()=>{
            this.onHashChange()
        })
        window.addEventListener('load', ()=>{
            this.onHashChange()
        })

        this.routerMap = {}
        options.routes.forEach((route)=>{
            this.routerMap[route.path] = route.component
        })
    }

    onHashChange() {
        this.current = window.location.hash.slice(1)
        this.matched = []
        this.match()
    }

    match(routes) {
        routes = routes || this.$options.routes

        // 递归遍历
        routes.forEach((route) => {
            if(route.path === '/' && this.current === '/'){
                this.matched.push(route)
                return 
            }
            if(route.path !== '/' && this.current.indexOf(route.path) != -1){
                this.matched.push(route)
                if(route.children){
                    this.match(route.children)
                }
                return
            }
        })
    }
}

KVueRouter.install = function(_Vue){
    Vue= _Vue;

    // 获取根实例中的router选项
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 实现两个全局组件router-link和router-view
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h){
            return h('a', {attrs: {href: '#'+this.to}}, this.$slots.default)
        }
    })

    Vue.component('router-view', {
        render(h) {
            // 标记当前router-view深度
            this.$vnode.data.routerView = true
            let parent = this.$parent
            let depth = 0

            while(parent){
                if(parent.$vnode && parent.$vnode.data && parent.$vnode.data.routerView){
                    // 说明当前parent是一个router-view
                    depth++
                }
                parent = parent.$parent
            }


            // const {routerMap, current} = this.$router
            // const component = routerMap[current] || null
            let component = null
            
            if(this.$router.matched[depth]){
                component = this.$router.matched[depth].component
            }
            return h(component) //this.$router.current对应上述的current
        }
    })

}
export default KVueRouter