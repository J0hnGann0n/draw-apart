import '@/styling/styles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faCrown,
  faCheck,
  faArrowLeft,
  faArrowRight,
  faUndo,
  faTrash,
  faShareAlt,
  faSlidersH,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faCrown,
  faCheck,
  faArrowLeft,
  faArrowRight,
  faUndo,
  faTrash,
  faShareAlt,
  faSlidersH,
  faQuestionCircle,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

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
