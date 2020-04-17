import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  base: process.env.VUE_APP_BASE_URL,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        layout: 'page'
      },
      component: () => import('./pages/CertificatesPage/CertificatePage')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'auth',
        public: true
      },
      component: () => import('./pages/AuthPages/LoginPage')
    },
    {
      path: '/join',
      name: 'join',
      meta: {
        public: true
      },
      component: () => import('./pages/AuthPages/SignUpPage')
    },
    {
      path: '/forgot_password',
      name: 'forgot_password',
      meta: {
        public: true
      },
      component: () => import('./pages/AuthPages/ForgotPasswordPage')
    },
    {
      path: '/user_managment',
      name: 'user_managment',
      meta: {
        public: true
      },
      component: () => import('./pages/UsersManagmentPage/UsersManagmentPage')
    },
    {
      path: '*',
      beforeEnter: (to, from, next) => {
        next({ name: 'not-found' })
      }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const isLogged = store.state.auth.isLogged

//   store.commit('ui/SET_LAYOUT', to.meta.layout)
//   if (to.matched.some(record => record.meta.public)) {
//     return next()
//   } else {
//     if (!isLogged) {
//       store.commit('ui/SET_LAYOUT', from.meta.layout)
//       return next({ name: 'welcome' })
//     } else {
//       return next()
//     }
//   }
// })

export default router