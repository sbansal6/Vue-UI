import AccountView from '../components/account/AccountView.vue';
import AccountNew from '../components/account/AccountNew.vue';
import DashboardView from '../components/DashBoard.vue';
import LoginView from '../components/Login.vue'

export default [
    {path: '/login', component: LoginView },
    {path: '/', component: AccountView },
    {path: '/new', component: AccountNew, name:'newaccount' },
    {path: '/dashboard',component:DashboardView}
]
