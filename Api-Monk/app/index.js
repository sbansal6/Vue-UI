import Vue from 'vue';
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VModal)

new Vue({
    el: '#app',
    template: '<router-view></router-view>',
    router,
    data: {
        message: "Hello There From Vue RReset"
    },
    store,
    components : {

    },
    computed : {
        showSpinner() {
            return true
        }
    }
});