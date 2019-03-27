import Vue from 'vue'
// import Axios from 'axios';
import App from './App.vue'
import store from './store'
import router from './router'
import './cube-ui'
import './registerServiceWorker'
import './register'
import "common/stylus/index.styl";

Vue.config.productionTip = false
// Vue.prototype.$axios = Axios

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
