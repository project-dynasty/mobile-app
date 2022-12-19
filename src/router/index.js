import { createRouter, createWebHistory } from '@ionic/vue-router';
import app from "@/main";

const routes = [
  /*
  * Routes:
  * /auth/login
  * /auth/login/2fa
  * /auth/login/forget-password
  * /news/$pageId
  * /news/article/$newsId
  * /profile
  * /profile/settings
  * /profile/$userName
  * */
  {
    name: 'NewsRedirection',
    path: '/',
    redirect: '/news',
  },
  {
    name: 'NewsView',
    path: '/news',
    component: () => import('@/views/NewsView.vue')
  },
  {
    name: 'LoginView',
    path: '/auth/login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      auth: false,
      menubar: false
    }
  },
  {
    name: '2faView',
    path: '/auth/login/2fa',
    component: () => import('@/views/auth/2faView.vue'),
    meta: {
      auth: false,
      menubar: false
    }
  },
  {
    name: 'ForgetPasswordView',
    path: '/auth/login/forget-password',
    component: () => import('@/views/auth/ForgetPasswordView.vue'),
    meta: {
      auth: false,
      menubar: false
    }
  },
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
