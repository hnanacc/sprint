import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {

    layout: {
      rightPanel: true,
      bottomToolBar: true,
      customTestsMode: false,
    },

    buildMessages: [],

    editor: null,
    allCodeFiles: [],
    activeCodeFile: null,
    activateTestCaseDialog: false,
  },
  mutations: {

    activateTestCaseDialog(state){
      state.activateTestCaseDialog = !state.activateTestCaseDialog;
    },

    setActiveCodeFile(state, codeFile){
      state.activeCodeFile = codeFile;
      state.editor.changeModel(codeFile.model);
    },

    changeCustomTestsMode(state){
      state.layout.customTestsMode = !state.layout.customTestsMode;
    },

    addCodeFile(state, newCodeFile){      
      state.allCodeFiles.push(newCodeFile);
      state.activeCodeFile = newCodeFile;
    },

    changeTestCasesDialogState(state){
      state.activateTestCaseDialog = !state.activateTestCaseDialog;
    },

    addTestCaseToActiveFile(state, testcase){
      state.activeCodeFile.addTestCase(testcase);
    },

    setEditor(state, editor){
      state.editor = editor
    },

    notify(state, event){
      state.buildMessages.unshift(event);
      console.log(state.buildMessages);
    }

  },
  actions: {
  },
  modules: {
  }
})
