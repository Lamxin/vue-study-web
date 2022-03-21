import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) { // 滚动条
      if (savedPosition) {
        return savedPosition // 会保存页面的滑动状态
      } else {
        return { x: 0, y: 0 }
      }
    },
    fallback: true // 设置浏览器不支持history路由时，自动改为hash路由
  })
}
