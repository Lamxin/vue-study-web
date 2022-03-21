import Vue from 'vue'

const ChildComponent = {
  template: `<div>ChildComponent{{data.value}}</div>`,
  inject: ['grandPa', 'data'],
  mounted () {
    console.log(this.$parent.$options.name) // 父组件
    console.log(this.grandPa, this.text) // 祖先与子节点传值---子节点
  }
}
const component = {
  name: 'component',
  components: {
    ChildComponent
  },
  props: {
    propOne: String
  },
  // template: `
  //   <div>
  //     <input type="text" v-model="text">
  //     {{propOne}}
  //     <div>
  //       <slot value="555" name="插槽"></slot>
  //     </div>
  //   </div>
  // `,
  template: `
    <div :style="style">
      <slot value="555" name="作用域插槽"></slot>
      <child-component></child-component>
    </div>
  `,
  data () {
    return {
      text: 'extend',
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #DDDDDD'
      }
    }
  }
}

// const ComVue = Vue.extend(component)

// new ComVue({
//   el: '#root',
//   propsData: {
//     propOne: '111'
//   }
// })

// const component2 = {
//   extends: component,
//   data () {
//     return {
//       text: '1'
//     }
//   }
// }

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data () {
    return {
      text: '本组件数据'
    }
  },
  provide () {
    const data = {}

    Object.defineProperty(data, 'value', {
      get: () => this.text,
      enumerable: true
    }) // provide和inject的绑定默认不是可响应的

    return {
      grandPa: this, // 祖先与子节点传值---祖先
      data
    }
  },
  // template: `
  //   <div>
  //     <comp-one>
  //       <div slot-scope="props">{{props}}{{props.value}}{{props.name}}{{text}}</div>
  //     </comp-one>
  //     <input type="text" v-model="text">
  //   </div>
  //   `,
  render (createElement) { // render的用法
    return createElement(
      'comp-one',
      {
        ref: 'comp'
      },
      [
        createElement('span', {
          ref: 'span'
        }, this.value)
      ]
    )
  }
})
