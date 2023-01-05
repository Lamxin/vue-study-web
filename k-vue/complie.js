// 编译器
// 递归遍历dom树
// 判断节点类型，如果是文本，则判断是否是差值绑定
// 如果是元素，则遍历其属性判断是否是指令或事件，然后递归子元素
class Compiler {
    // el是宿主元素
    // vm是KVue实例
    constructor(el ,vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        if(this.$el) {
            // 执行编译
            this.compile(this.$el)
        }
    }

    compile(el) {
        // 遍历el树
        const childNodes = el.childNodes
        childNodes.forEach(node => {
            // 判断是否是元素
            if(this.isElement(node)){
                this.compileElement(node)
            }else if (this.isInter(node)){
                this.compileText(node)
            }

            if(node.childNodes && node.childNodes.length){
                this.compile(node)
            }
        });
    }

    isElement(node) {
        return node.nodeType === 1
    }

    isInter(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileText(node) {
        // node.textContent = this.$vm[RegExp.$1]
        this.update(node, RegExp.$1, 'text')
    }

    compileElement(node) {
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value
            if(this.isDirective(attrName)){
                const dir = attrName.substring(2)
                // 执行指令
                this[dir] && this[dir](node, exp)
            }
            if(this.isEvent(attrName)){
                const dir = attrName.substring(1)
                this.eventHandler(node, exp, dir)
            }
        })
    }

    // 实现k-text指令
    text(node, exp) {
        // node.textContent = this.$vm[exp]
        this.update(node, exp, 'text')
    }

    update(node, exp, dir) {
        // 初始化
        // 指令对应的更新函数
        const fn = this[dir+ 'Updater']
        fn && fn(node, this.$vm[exp])

        // 更新处理
        new Watcher(this.$vm, exp, function(val){
            fn && fn(node, val)
        })
    }

    textUpdater(node, val){
        node.textContent = val
    }

    isDirective(attr) {
        return attr.indexOf('k-') === 0
    }

    isEvent(dir){
        return dir.indexOf('@') === 0
    }

    eventHandler(node, exp, dir){
        const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp]
        node.addEventListener(dir, fn.bind(this.$vm), dir)
    }
}