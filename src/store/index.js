import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    layout: {
      rightPanel: true,
      bottomToolBar: true,
      customTestsMode: false,
    },

    eventQueue: [],

    term: null,

    curProcess: 'Sprint Editor v0.1.0',

    editor: null,
    allCodeFiles: [],
    activeCodeFile: null,
    curTestcase: null,
    activateAddTestCaseDialog: false,
    activateShowTestCaseDialog: false,
  },
  mutations: {

    setStatus(state, msg){
      state.curProcess = msg;
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

    changeAddTestCasesDialogState(state){
      state.activateAddTestCaseDialog = !state.activateAddTestCaseDialog;
    },

    changeShowTestCaseDialogState(state, idx){

      if (idx === null){
        state.editor.closeDiff();
      } else {
        state.curTestcase = {
          testcase: state.activeCodeFile.testcases[idx],
          idx: idx
        };
      }
      state.activateShowTestCaseDialog = !state.activateShowTestCaseDialog;
    },

    addTestCaseToActiveFile(state, testcase){
      state.activeCodeFile.addTestCase(testcase);
    },

    setEditor(state, editor){
      state.editor = editor
    },

    notify(state, event){
      state.eventQueue.unshift(event);
    }

  },
  actions: {
  },
  modules: {
  }
})
