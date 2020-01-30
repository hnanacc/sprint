<template>
  <v-container class="ma-0 pa-0">
    <v-container class="d-flex justify-space-around">
      <v-btn small class="blue" @click="runCode">run code</v-btn>
      <!-- vue-done -->
      <v-btn small @click="compileRunCode">compile/run code</v-btn>
      <!-- vue-done -->
      <v-btn small @click="addTest">add testcase</v-btn>
      <!-- vue-done -->
      <v-btn small @click="changeMode">{{modeBtnText}}</v-btn>
      <!-- done -->
    </v-container>

    <v-container class="selector d-flex justify-space-around align-center flex-nowrap">
      <v-select
        label="Select problem"
        class="problemSelector"
        :items="files"
        return-object
        single-line
        v-model="selected"
        hide-details
        dense
        outlined
      ></v-select>

      <v-btn @click="newFile" class="ml-2" small>new file</v-btn>
      <!-- done -->
      <v-btn @click="openFile" class="ml-2" small>open file</v-btn>
      <v-btn @click="saveFile" class="ml-2" small>save file</v-btn>
    </v-container>

    <v-dialog max-width="40%" :value="activateTestCaseDialogVal">
      <AddTestCaseDialog></AddTestCaseDialog>
    </v-dialog>
  </v-container>
</template>

<script>
const { dialog } = require("electron").remote;
import CodeFile from "@/utils/CodeFile";

import AddTestCaseDialog from "@/components/AddTestCaseDialog";

export default {
  components: {
    AddTestCaseDialog
  },

  methods: {
    runCode: function() {
      this.$store.state.activeCodeFile.runCode();
    },

    compileRunCode: function() {
      this.$store.state.activeCodeFile.compileRunCode();
    },

    addTest: function() {
      this.$store.commit("changeTestCasesDialogState");
    },

    changeMode: function() {
      this.$store.commit("changeCustomTestsMode");
    },

    changeActiveFile: function() {
      console.log(this.activeFile);
      this.$store.state.editor._editor.setModel(this.activeFile);
    },

    newFile: function() {
      var targetPath = dialog.showSaveDialogSync();
      console.log(targetPath);

      var newFileModel = this.$store.state.editor.newFile(targetPath);

      const newCodefile = new CodeFile(
        newFileModel.model,
        targetPath,
        newFileModel.lang
      );

      this.$store.commit("addCodeFile", newCodefile);
    },

    openFile: function() {
      var targetPath = dialog.showOpenDialogSync({
        properties: ["openFile", "multiSelections"]
      });

      for(var item of targetPath){
        var newFileModel = this.$store.state.editor.newFile(item);

        const openCodeFile = new CodeFile(
          newFileModel.model,
          item,
          newFileModel.lang
        );

        this.$store.commit("addCodeFile", openCodeFile);

      }
      
    },

    saveFile: function() {
      this.$store.state.activeCodeFile.saveFile();
      this.$store.commit('notify', {
        type: 'info',
        msg: 'File saved successfully!'
      });
    }
  },

  computed: {
    modeBtnText() {
      if (this.$store.state.layout.customTestsMode) {
        return "normal test";
      } else {
        return "custom test";
      }
    },

    files() {
      return this.$store.state.allCodeFiles;
    },

    selected: {
      get: function() {
        return this.$store.state.activeCodeFile;
      },

      set: function(newValue) {
        this.$store.commit("setActiveCodeFile", newValue);
      }
    },

    activateTestCaseDialogVal() {
      return this.$store.state.activateTestCaseDialog;
    }
  }
};
</script>

<style>
.selector {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}

.problemSelector {
  width: 40%;
}
</style>