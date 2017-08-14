import Vue from 'vue';
import router from './router'

new Vue({
    el: '#app',
    template: '<router-view></router-view>',
    router,
    data: {
        message: "Hello There From Vue RReset"
    }
});