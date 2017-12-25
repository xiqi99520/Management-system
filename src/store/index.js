import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './action'
import mutations from './mutations'

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
