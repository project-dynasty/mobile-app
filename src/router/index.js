import { createRouter, createWebHistory } from '@ionic/vue-router';
import app from "@/main";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
path: '/login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach(async (to, from, next) => {
  const response = await app.$auth.changeRoute(to, from)
  if (response.path === undefined) {
    next()
  } else {
    next(response)
  }
})

export default router
