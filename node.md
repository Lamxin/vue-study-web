# element UI中的form封装

## provide/inject的应用

## bus的应用
    $emit/$on是对于一个公共实例，可用于任何组件

## 表单输入绑定
    v-model指令在表单<input>、<textarea>、及<select>元素上创建双向数据绑定。
    它会根据控件类型自动选取方法来更新元素

    v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：
    - text 和 textarea 元素使用 value property 和 input 事件；
    - checkbox 和 radio 使用 checked property 和 change 事件；
    - select 字段将 value 作为 prop 并将 change 作为事件。

## inheritAttrs: false 
    组件的根组件不要继承特性

## v-bind="$attrs"

## vue中install用法
    - 全局注册组件
    ``` 
    import ToolBar from "./ToolBar"
    import Menu from "./Menu"
    export default {
        install (Vue) {
            Vue.component('ToolBar', ToolBar)
            Vue.component('Menu', Menu)
        }
    }
    // 在main.js中直接引用并用Vue.use进行注册
    import component from "@/components"
    Vue.use(component)
    ```

    - 全局自定义指令
    ```
    export default {
        install(Vue){
            Vue.directive('drag')
        }
    }
    // 在main.js中直接引用
    import drag from "@/api"
    Vue.use(drag)
    //用法 v-drag
    ```
***