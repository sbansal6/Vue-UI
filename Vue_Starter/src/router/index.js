import Vue from 'vue'
import Router from 'vue-router'

// Views
import DashboardView from '@/views/Dashboard'
import DataSetView from '@/views/DataSet'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/datasets',
      name: 'DataSets',
      component: DataSetView
    }
  ]
})
