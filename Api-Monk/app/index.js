import Vue from 'vue';
import router from './router'
import store from './store'

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