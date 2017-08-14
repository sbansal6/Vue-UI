import Vue from 'vue'
import Router from 'vue-router'

// Screens | Views
import ApiFormScreen from '../screens/ApiForm.vue'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path:'/',
            redirect:'/apiform'
        },
        {
            path: '/apiform',
            name: 'ApiForm',
            component: ApiFormScreen
        },
        {
            path: '/datasets',
            name: 'DataSets',
            component: ApiFormScreen
        }
    ]
})
