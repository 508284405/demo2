import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../components/login/login.vue'
import RegisterView from '../components/login/register.vue'
import Redis from '../views/Redis.vue'
import Mysql from '../views/Mysql.vue'
import RedisHomeView from '../components/redis/RedisHomeView.vue'
import RedisRealLog from '../components/redis/RedisRealLog.vue'
import RedisStatistics from '../components/redis/RedisStatistics.vue'
import RedisDirectives from '../components/redis/directives/index.vue'
import RedisCommands from '../components/redis/command/index.vue'
import RedisConfigs from '../components/redis/config/index.vue'
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
          component: Redis,
          children: [
            
          ]
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
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/redis/home',
      name: 'redis_home',
      component: RedisHomeView,
      children:[
        {
          path: '/redis/reallog',
          name: 'redis_real_log',
          component: RedisRealLog
        },
        {
          path: '/redis/statistics',
          name: 'redis_statistics',
          component: RedisStatistics
        },
        {
          path: '/redis/directives/index',
          name: 'redis_directives_index',
          component: RedisDirectives
        },
        {
          path: '/redis/command/index',
          name: 'redis_command_index',
          component: RedisCommands
        },
        {
          path: '/redis/config/index',
          name: 'redis_config_index',
          component: RedisConfigs
        }
      ]
    }
  ]
})

export default router
