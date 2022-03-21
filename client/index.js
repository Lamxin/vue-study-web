import Vue from 'vue'
import App from './app.vue'

// import './assets/styles/test.css';
import './assets/styles/style.styl'
import './assets/styles/global.styl'
import VueRouter from 'vue-router'
import createRoute from './config/router'
const root = document.createElement('div')
const router = createRoute()

router.beforeEach((to, from, next) => {
  next()
})

document.body.appendChild(root)

Vue.use(VueRouter)
new Vue({
  router,
  render: (h) => h(App)
}).$mount(root)
