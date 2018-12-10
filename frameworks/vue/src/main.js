import Vue from 'vue'
import App from './App.vue'

import 'pure-css'
import '@/assets/styles/main.sass'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')