import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
    {{bArray.join(',')}}
    {{bArray.toString()}}
  </div>`,
  data: {
    bArray: [1, 2, 3, 4]
  }
})
