<template>
  <v-container class="ma-0 pa-0">

    <v-container class="d-flex justify-space-around">
      <v-btn small class="blue" @click="runCode">run code</v-btn> <!-- vue-done -->
      <v-btn small @click="compileRunCode">compile/run code</v-btn> <!-- vue-done -->
      <v-btn small @click="addTest">add testcase</v-btn> <!-- vue-done -->
      <v-btn small @click="changeMode">{{modeBtnText}}</v-btn> <!-- done -->
    </v-container>

    <v-container class="selector d-flex align-center flex-nowrap">
        <v-select label="Select problem" :items="files" @change="changeActiveFile" v-model="activeFile" hide-details dense outlined></v-select>
        <v-btn @click="newFile" class="ml-2" small>new file</v-btn> <!-- done -->
        <v-btn @click="openFile" class="ml-2" small>open file</v-btn>
        <v-btn @click="saveFile" class="ml-2" small> save file </v-btn>
    </v-container>

    <v-dialog max-width="40%" :value="activateTestCaseDialogVal">
      <AddTestCaseDialog></AddTestCaseDialog>
    </v-dialog>

  </v-container>
</template>

<script>

const {dialog} = require('electron').remote;
import CodeFile from '@/utils/CodeFile';

import AddTestCaseDialog from '@/components/AddTestCaseDialog';

export default {

  components: {
    AddTestCaseDialog,
  },

  methods: {

    runCode: function(){
      this.$store.state.activeCodeFile.runCode();
    },

    compileRunCode: function(){
      this.$store.state.activeCodeFile.compileRunCode();
    },

    addTest: function(){
      this.$store.commit('changeTestCasesDialogState');
    },

    changeMode: function(){
      this.$store.commit('changeCustomTestsMode');
    },
    
    changeActiveFile: function(){
      // Need to figure out.
    },

    newFile: function(){

      var targetPath = dialog.showSaveDialogSync();
      const newCodefile = new CodeFile(
        "New monaco editor instance",
        targetPath
      );
      this.$store.commit('addCodeFile', newCodefile);
      console.log('Added a new file...' + targetPath);
    },

    openFile: function(){

      var targetPath = dialog.showOpenDialogSync({
        properties: ['openFile']
      })

      const openCodeFile = new CodeFile(
        "New Monaco editor instance",
        targetPath
      )

      console.log(openCodeFile);

      this.$store.commit('addCodeFile', openCodeFile);

      console.log('openfile...' + targetPath);
    },

    saveFile: function() {
      console.log('saving file...');
    },    
  },

  computed: {
    modeBtnText(){
      if(this.$store.state.layout.customTestsMode) {
        return 'normal test';
      } else {
        return 'custom test';
      }
    },

    files(){
      return this.$store.state.allCodeFiles;
    },

    activateTestCaseDialogVal(){
      return this.$store.state.activateTestCaseDialog;
    }
  },

  data(){
      return {
          activeFile: null,
      }
  }
};
</script>

<style>
.selector {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}

</style>