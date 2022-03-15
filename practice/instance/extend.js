import Vue from 'vue'

const component = {
  props: {
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      {{propOne}}
    </div>
  `,
  data () {
    return {
      text: 'extend'
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

const component2 = {
  extends: component,
  data () {
    return {
      text: '1'
    }
  }
}

new Vue({
  el: '#root',
  components: {
    Comp: component2
  },
  template: '<Comp></Comp>'
})
