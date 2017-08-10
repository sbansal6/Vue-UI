import Vue from 'vue'
import Router from 'vue-router'

// Screens | Views
import CalendarScreen from '@/screens/Calendar'
import DataSetScreen from '@/screens/DataSet'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path:'/',
      redirect:'/calendar'
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: CalendarScreen
    },
    {
      path: '/datasets',
      name: 'DataSets',
      component: DataSetScreen
    }
  ]
})
