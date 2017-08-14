import Vue from 'vue';
import router from './router'
import VueFormGenerator from "vue-form-generator";

Vue.use(VueFormGenerator);
new Vue({
    el: '#app',
    template: '<router-view></router-view>',
    router,
    data: {
        message: "Hello There From Vue RReset"
    }
});