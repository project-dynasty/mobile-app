import { createRouter, createWebHistory } from '@ionic/vue-router';
import app from "@/main";

const routes = [
    // Error Routes
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
    // Authentication Routes
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
    name: 'ForgetPasswordView',
    path: '/auth/forget-password',
    component: () => import('@/views/auth/ForgetPasswordView.vue'),
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
    // Home Routes
  {
    name: 'MainPath',
    path: '/',
    redirect: '/home'
  },
  {
    name: 'NewsArticleView',
    path: '/news/$articleId',
    component: () => import('@/views/home/NewsArticleView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
  {
    name: 'NewsListView',
    path: '/home',
    component: () => import('@/views/home/HomeView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
    // Explore Routes
  {
    name: 'ExploreView',
    path: '/explore',
    component: () => import('@/views/explore/ExploreView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
    // Notifcation Routes
  {
    name: 'NotificationsView',
    path: '/notifications',
    component: () => import('@/views/notifications/NotificationListView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
  {
    name: 'NotificationObjectView',
    path: '/notifications/objects/:notificationId',
    component: () => import('@/views/notifications/NotificationObjectView.vue'),
    meta: {
      auth: true,
      menubar: true
    }
  },
    // Profile Routes
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
    path: '/profile/:username',
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
