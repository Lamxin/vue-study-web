import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router"
import create from './utils/create'

Vue.use(create)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
