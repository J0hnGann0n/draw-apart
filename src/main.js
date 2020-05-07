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
import 'inobounce'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import Vue2TouchEvents from "vue2-touch-events";
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

Vue.component('font-awesome-icon', FontAwesomeIcon)

if (!process.env.VUE_APP_DEBUG) {
  Sentry.init({
    dsn: 'https://9a85c2e8b9af45bc9f38dcee787ed8be@o381283.ingest.sentry.io/5208398',
    integrations: [new VueIntegration({ Vue, attachProps: true, logErrors: true })],
  });
} else {
  Sentry.init({
    dsn: 'https://03f8f0bfc1564dbf913d4e148801769c@o381283.ingest.sentry.io/5226935',
    integrations: [new VueIntegration({ Vue, attachProps: true, logErrors: true })],
  });
}


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
  faQuestionCircle
)

Vue.prototype.$http = axios
var SocialSharing = require('vue-social-sharing');

Vue.config.productionTip = false
Vue.use(Vue2TouchEvents);
Vue.use(SocialSharing)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
