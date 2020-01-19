import Vue from 'vue'
import VueRouter from 'vue-router'
import Controls from '@/views/Controls.vue'
import Settings from '@/views/Settings.vue'
import Terminal from '@/views/Terminal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'controls',
    component: Controls
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/terminal',
    name: 'terminal',
    component: Terminal
  },
]

const router = new VueRouter({
  routes
})

export default router
