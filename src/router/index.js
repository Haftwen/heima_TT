import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from 'views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    // 避免首屏加载慢，采用路由懒加载
    component: () => import('views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
