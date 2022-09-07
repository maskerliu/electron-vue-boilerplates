import { createRouter, createWebHashHistory } from 'vue-router'


export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/info',
      name: 'Info',
      component: require('@/pages/info/EnvInfo').default,
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: require('@/pages/welcome/Welcome').default,
    },
  ],
})
