// 数组响应式
// 1、替换数组原型中7个方法
const orginalProto = Array.prototype
const arrayProto = Object.create(orginalProto)
['push', 'pop', 'shift', 'unshift'].forEach(method => {
    arrayProto[method] = function() {
        // 先执行原数组原型操作
        orginalProto[method].apply(this, arguments)
        // 执行更新
 
    }
});
// 对象响应式
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
    if(Array.isArray(obj)) {
        obj.__proto__ = arrayProto
        const keys = Object.keys(obj)
        for(let i = 0; i < obj.length; i++){
            observe(obj[i])
        }
    }
    for(let key in obj){
        defineReactive(obj, key, obj[key])
    }
}

function set(obj, key, value) {
    defineReactive(obj, key, value)
}
let student = {
    'name': 'zhangSan',
    'score': {
        'math': '100',
        'chinese': '100'
    } 
}
observe(student)

student.name
student.name = 'liSi'

student.score.math = 80
student.score = {math: 88}
student.score.math

set(student, 'sex', '女')
student.sex