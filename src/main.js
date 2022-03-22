import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
