class KVue {
    constructor(options){
        this.$data = options.data

        observe(this.$data)
        proxy(this, '$data')
        new Compiler(options.el, this)
    }
}

function proxy(vm, sourceKey){
    Object.keys(vm[sourceKey]).forEach((key) => {
        Object.defineProperty(vm, key, {
            get() {
                return vm[sourceKey][key]
            },
            set(newVal) {
                vm[sourceKey][key] = newVal
            }
        })
    })
}

class Observer {
    constructor(value) {
        if(typeof value === 'object') {
            this.walk(value)
        }
    }

    walk (obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    } 
    // TODO 数组数据响应化，待补充
}

function defineReactive(obj, key, val) {
    observe(val)
    
    // 创建一个Dep和当前key一一对应
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get() {
            Dep.target && dep.addDep(Dep.target)
            // console.log(`get ${key}: ${val}`)
            return val
        },
        set(newVal) {
            if(val !== newVal){
                observe(newVal)
                // console.log(`set ${key}: ${newVal}`)
                val = newVal

                dep.notify()
            }   
        } 
    })
}

function observe(obj){
    if(typeof obj !== 'object' || obj === null){
        return 
    }
    
    new Observer(obj)
}

const watchers = []
class Watcher {
    constructor(vm, key, updateFn) {
        this.vm = vm
        this.key = key
        this.updateFn = updateFn

        watchers.push(this)

        // Dep.target静态属性上设置为当前watcher实例
        Dep.target = this
        this.vm[this.key]  // 读取触发getter
        Dep.target = null // 收集完就置空
    }

    update() {
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}

// Dep: 依赖，管理某个key相关所有watcher实例
class Dep{
    constructor() {
        this.deps = []
    }

    addDep (dep){
        this.deps.push(dep)
    }

    notify() {
        this.deps.forEach(dep => dep.update())
    }
}