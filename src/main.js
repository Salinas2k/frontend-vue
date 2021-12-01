import Vue from 'vue'
import App from './App.vue'

import ApiService from './common/api.service.js'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
ApiService.init();

new Vue({
  render: h => h(App),
}).$mount('#app')
