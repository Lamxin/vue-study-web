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