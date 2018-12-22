import Vue from 'vue'
import App from './App.vue'
import router from './router'

import moment from 'moment'
import 'moment/locale/sv' 

moment.locale('sv')

import '@/global'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
