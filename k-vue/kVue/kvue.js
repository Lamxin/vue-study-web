class KVue {
    constructor(options){
        this.$data = options.data

        observe(this.$data)
        proxy(this, '$data')
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
    
    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}: ${val}`)
            return val
        },
        set(newVal) {
            if(val !== newVal){
                observe(newVal)
                console.log(`set ${key}: ${newVal}`)
                val = newVal
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