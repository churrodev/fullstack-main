import { createRouter, createWebHistory } from 'vue-router'

const ChargerList = () => import('@/pages/ChargerList.vue')

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', name: 'home', redirect: { name: 'chargers' } },
    { path: '/chargers', name: 'chargers', component: ChargerList }
  ]
})

export default router
