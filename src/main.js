

import '@/styling/styles.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import Vue2TouchEvents from "vue2-touch-events";

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vue2TouchEvents);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
