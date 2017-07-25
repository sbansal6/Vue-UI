import Vue from 'vue';
import MainView from './components/MainView.vue';
import AccountList from './components/account/AccountList.vue';
import AccountItem from './components/account/AccountItem.vue'
import VueRouter from 'vue-router';
import routes from './util/routes';

Vue.use(VueRouter);
// register components
Vue.component('account-list',AccountList);
Vue.component('account-item',AccountItem);

const router = new VueRouter({
    routes
});

// Vue Instance
new Vue({
    el:'#app',
    router,
    data:{
        message:'AdTech'
    },
    components : {
        MainView
    }
})