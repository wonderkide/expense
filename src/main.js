import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueToast from 'vue-toast-notification';
import VueSweetalert2 from 'vue-sweetalert2';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueToast, {
  position: 'top'
})
Vue.use(VueSweetalert2);

Vue.config.productionTip = false
Vue.prototype.$liff = window.liff
Vue.prototype.$toast = Vue.$toast

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
