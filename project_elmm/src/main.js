import Vue from 'vue'
// import Axios from 'axios';
import App from './App.vue'
import './cube-ui'
import './registerServiceWorker'
import './register'
import "common/stylus/index.styl";

Vue.config.productionTip = false
// Vue.prototype.$axios = Axios

new Vue({
  render: h => h(App)
}).$mount('#app')
