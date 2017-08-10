// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Root from './screens/Root.vue'
import router from './router'
import moment from 'moment-timezone'
import store from './store'

moment.tz.setDefault('UTC')

Object.defineProperty(Vue.prototype, '$moment', { get () { return this.$root.moment } })

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  template: '<Root/>',
  components: { Root },
  data: {
    moment
  },
  store
})
