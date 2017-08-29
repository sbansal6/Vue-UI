import Vue from 'vue'
import Router from 'vue-router'

// Screens | Views
import Root from '../screens/Root.vue'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/root',
            name: 'root',
            component: Root
        }
    ]
})
