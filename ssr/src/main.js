import Vue from 'vue'
import App from './App.vue'
import {createRouter} from "./router/index"
Vue.config.productionTip = false

export function createApp(context) {
  // 1、创建路由器实例
  const router = createRouter()

  // 2、创建vue实例
  const app = new Vue({
    router,
    context,
    render: h => h(App)
  })

  return {app, router}
}
