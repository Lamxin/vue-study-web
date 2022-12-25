let Vue;

class Store {
    constructor(options){
        this._mutations = options.mutations;
        this._actions = options.actions;
        this._wrappedGetters = options.getters;

        // 定义computed选项
        const computed = {}
        this.getters = {} // 抛出getters
        const store = this

        Object.keys(this._wrappedGetters).forEach(key => {
            const fn = store._wrappedGetters[key]
            // 转换为computed可以使用的无参数形式
            computed[key] = function() {
                return fn(store.state)
            }

            Object.defineProperty(store.getters, key, { // 定义的key是响应式的
                get: () => store._vm[key]
            })
            // 如果直接用store.getters[key] = store._vm[key]则数据不会更新
        })

        //响应化处理state
        // this.state = new Vue({
        //     data: options.state
        // })
        this._vm = new Vue({
            data: {
                // $$,vue不做代理
                $$state: options.state
            },
            computed
        })

        // 绑定commit、dispatch的上下文为store实例
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }
    // 存取器
    get state () {
        return this._vm._data.$$state
    }
    set state (v) {
        console.log('不可以直接设置state中的值')
    }
    // store.commit('add', 1)
    // type是mutations的类型
    // payload: 参数
    commit(type, payload) {
        const entry = this._mutations[type]
        if(entry){
            entry(this.state, payload)
        }
    }

    dispatch(type, payload){
        const entry = this._actions[type]
        if(entry){
            entry(this, payload)
        }
    }
}

function install(_Vue) {
    Vue = _Vue 
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store){ // 获取main.js中的store，并设置为全局变量
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {
    Store,
    install
}