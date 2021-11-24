import Vue from 'vue'
import router from './router'

import App from "./App.vue";

import Apiservice from './common/api.service'

Vue.config.productionTip = false;

Apiservice.init();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
