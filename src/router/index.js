import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from 'views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('views/Layout'),
    // 浏览器默认取消空格如果访问页面想直接到首页需要重定向
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('views/Home')
      },
      {
        path: '/video',
        // chunk模式
        component: () => import(/* webpackChunkName:"base" */ 'views/video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName:"base" */ 'views/QA')
      },
      {
        path: '/profile',
        component: () => import('views/My')
      }
    ]
  },
  {
    path: '/login',
    // 避免首屏加载慢，采用路由懒加载
    component: () => import('views/login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:"Search" */ '@/views/Search')
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName:"User" */ '@/views/User')
  }
]

const router = new VueRouter({
  routes
})

export default router
