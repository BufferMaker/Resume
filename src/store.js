import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  printState: false
}

const mutations = {
  printResume(state, flag) {
    state.printState = flag
  }
}

export default new Vuex.Store({
  state,
  mutations
})
