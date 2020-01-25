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

    allCodeFiles: ['a.cpp', 'b.cpp', 'c.cpp', 'd.cpp'],
    activeCodeFile: null,
    activateTestCaseDialog: false,
  },
  mutations: {

    changeCustomTestsMode(state){
      state.layout.customTestsMode = !state.layout.customTestsMode;
    },

    addCodeFile(state, newCodeFile){

      console.log(newCodeFile);
      
      state.allCodeFiles.push(newCodeFile);
      state.activeCodeFile = newCodeFile;
    },

    changeTestCasesDialogState(state){
      state.activateTestCaseDialog = !state.activateTestCaseDialog;
    },

    addTestCaseToActiveFile(state, testcase){
      state.activeCodeFile.addTestCase(testcase);
    }

  },
  actions: {
  },
  modules: {
  }
})
