import Vue from 'vue'

new Vue({
  el: '#root',
  // template: '<div>{{text}}</div>',
  data () {
    return {
      text: 111
    }
  },
  beforeCreate () {
    console.log(this.text, 'beforeCreate')
  },
  created () {
    console.log(this.text, 'created')
  },
  beforeMount () {
    console.log(this.text, 'beforeMount')
  },
  mounted () {
    console.log(this.text, 'mounted')
  },
  beforeUpdate () {
    console.log(this.text, 'beforeUpdate')
  },
  updated () {
    console.log(this.text, 'updated')
  },
  activated () { // 在组件章节详解
    console.log(this.text, 'activated')
  },
  deactivated () { // 在组件章节详解
    console.log(this.text, 'deactivated')
  },
  beforeDestroy () {
    console.log(this.text, 'beforeDestroy')
  },
  destroy () {
    console.log(this.text, 'destroy')
  },
  render (h) {
    // throw new TypeError('render Error')
    return h('div', {}, this.text) // 功能同template
  },
  renderError (h, err) { // 只有在开发的时候会被调用，打包后不会被调用
    return h('div', {}, err.stack) // 只有本组件出错的时候会被调用，子组件不会被调用
  },
  errorCaptured () {
    // 会向上冒泡，并且正式环境可以使用
  }
})
