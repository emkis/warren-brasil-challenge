import Vue from 'vue'

import App from './App.vue'
import { initTheme } from '@/theme'

import '@/styles/globals.scss'
import '@/styles/themes/index.scss'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  mounted() {
    initTheme()
  },
}).$mount('#app')
