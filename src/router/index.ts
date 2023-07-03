import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import Redis from '../views/Redis.vue'
import Mysql from '../views/Mysql.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[
        {
          path: '/redis',
          name: 'redis',
          component: Redis
        },
        {
          path: '/mysql',
          name: 'mysql',
          component: Mysql
        },
      ]
    },
  
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
