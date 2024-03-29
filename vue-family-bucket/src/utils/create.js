import Vue from "vue"
import KNotice from "@/components/KNotice"
function create(component, props) {
    // 组件构造函数获取方法
    // 1、Vue.extend() 
    let Comp = Vue.extend(component)
    let comp = new Comp({propsData: props})
    comp.$mount()
    document.body.appendChild(comp.$el)

    comp.remove = function(){
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }
    // 2、render
    // const vm = new Vue({
    //     // h是createElement,返回VNode,是虚拟dom
    //     // 需要挂载才能变成真实dom
    //     render: h => h(component, {props}),
    // }).$mount() // 不指定宿主元素，则会创建真实dom,但是不会追加操作

    // document.body.appendChild(vm.$el)

    // const comp = vm.$children[0]

    // //删除
    // comp.remove = function() {
    //     document.body.removeChild(vm.$el)
    //     vm.$destroy()
    // }
    return comp
} 

export default {
    install(Vue){
        Vue.prototype.$message = function(options){
            return create(KNotice, options)
        }
    }
}