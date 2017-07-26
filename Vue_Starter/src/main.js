// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Root from './views/Root.vue'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  template: '<Root/>',
  components: { Root }
})
