import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {

    layout: {
      rightPanel: true,
      bottomToolBar: true,
      customTestsMode: false, 
    },

  },
  mutations: {

    changeCustomTestsMode(state){
      state.layout.customTestsMode = !state.layout.customTestsMode;
    }
  },
  actions: {
  },
  modules: {
  }
})
