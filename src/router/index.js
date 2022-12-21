import { createRouter, createWebHistory } from '@ionic/vue-router';
import app from "@/main";

const routes = [
  {
    name: 'SignIn',
    path: '/auth/sign-in',
    component: () => import('@/views/auth/SignInView.vue'),
    meta: {
      auth: false,
      menubar: false
    }
  },
  {
    name: 'MainPath',
    path: '/',
    redirect: '/news/1'
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
    path: '/auth/2fa',
    component: () => import('@/views/auth/2faView.vue'),
    meta: {
      auth: false,
      menubar: false
    }
  },
  {
    name: 'ForgetPasswordView',
    path: '/auth/forget-password',
    component: () => import('@/views/auth/ForgetPasswordView.vue'),
    meta: {
      auth: false,
      menubar: false
    }
  },
  {
    name: 'MaintenanceView',
    path: '/errors/maintenance',
    component: () => import('@/views/errors/MaintenanceView.vue'),
    meta: {
      auth: false,
      menubar: false
    }
  },
  {
    name: 'NoPermissionView',
    path: '/errors/no-permission',
    component: () => import('@/views/errors/NoPermissionView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
  {
    name: 'NotFoundView',
    path: '/errors/not-found',
    component: () => import('@/views/errors/NotFoundView.vue'),
    meta: {
      auth: true,
      menubar: true,
    }
  },
  {
    name: 'NewsListView',
    path: '/news/$pageId',
    component: () => import('@/views/news/NewsListView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
  {
    name: 'NewsArticleView',
    path: '/news/$articleId',
    component: () => import('@/views/news/NewsArticleView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
  {
    name: 'ExploreView',
    path: '/explore',
    component: () => import('@/views/explore/ExploreView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
  {
    name: 'NotificationsView',
    path: '/notifications/$pageId',
    component: () => import('@/views/notifications/NotificationListView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
  {
    name: 'NotificationObjectView',
    path: '/notifications/objects/$notificationId',
    component: () => import('@/views/notifications/NotificationObjectView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
  {
    name: 'ProfileView',
    path: '/profile',
    component: () => import('@/views/profile/ProfileView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
  {
    name: 'ProfileSettingsView',
    path: '/profile/settings',
    component: () => import('@/views/profile/ProfileSettingsView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
  {
    name: 'UserProfileView',
    path: '/profile/$username',
    component: () => import('@/views/profile/ProfileView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
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
