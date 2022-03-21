import Vue from 'vue'
import App from './app.vue'
import Vuex from 'vuex'
// import './assets/styles/test.css';
import './assets/styles/style.styl'
import './assets/styles/global.styl'
import VueRouter from 'vue-router'
import createRoute from './config/router'
import store from './store/store'
const root = document.createElement('div')
const router = createRoute()

router.beforeEach((to, from, next) => {
  next()
})

document.body.appendChild(root)

Vue.use(VueRouter)
Vue.use(Vuex)

// store.subscribe((mutation, state) => { // 每次调用mutation时都会触发
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root)
