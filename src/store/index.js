import Vue from 'vue'
import Vuex from 'vuex'

import { transactions } from './modules/transactions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [],
  modules: {
    transactions,
  },
})
