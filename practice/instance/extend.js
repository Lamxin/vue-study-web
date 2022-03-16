import Vue from 'vue'

const component = {
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
  template: `
    <div>
      <comp-one>
        <div slot-scope="props">{{props}}{{props.value}}{{props.name}}{{text}}</div>
      </comp-one>
    </div>
    `
})
