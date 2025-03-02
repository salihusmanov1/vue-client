
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'text-primary bg-muted border border-zinc-200',
  linkExactActiveClass: 'text-primary bg-muted border border-zinc-200',

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import('../views/HomeView.vue')
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import('../views/AdminView.vue'),
      meta: { admin: true },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import('../components/MainDashboard.vue')
        },
        {
          path: "merchants",
          name: "merchants",
          component: () => import('../components/MerchantsDashboard.vue')
        },
        {
          path: "customers",
          name: "customers",
          component: () => import('../components/CustomersDashboard.vue')
        }
      ]
    },

  ],
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  if (!store.isLoggedIn && (to.meta.auth || to.meta.admin)) return next({ name: 'home' })
  if (to.meta.admin && !store.user?.type === 'master') {
    return next({ name: 'home' })
  }
  return next()
})

export default router
