import Vue from 'vue'

import App from '@/App'
import { store } from '@/store'
import { initTheme } from '@/theme'

import '@/styles/globals.scss'
import '@/styles/themes/index.scss'

Vue.config.productionTip = false

new Vue({
  store,
  render: (h) => h(App),
  mounted() {
    initTheme()
  },
}).$mount('#app')
