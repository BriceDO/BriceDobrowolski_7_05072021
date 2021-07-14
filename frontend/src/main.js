import Vue from 'vue'
import App from './App.vue'
import Router from '../router/index.js'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Router);

Vue.config.productionTip = false

new Vue({
  router:Router,
  render: h => h(App),
}).$mount('#app')
