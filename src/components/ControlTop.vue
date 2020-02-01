<template>
  <v-container class="ma-0 pa-0">
    <v-container class="d-flex">
      <v-btn class="blue mx-1 runBtn" min-width="100px" rounded @click="compileRunCode">
        <v-icon left>{{icons.mdiPlay}}</v-icon> run  
      </v-btn>
      
      <v-btn  small class="mx-1" fab  @click="runCode">
        <v-icon>{{icons.mdiCached}}</v-icon>
      </v-btn>
      
      <v-btn small class="mx-1" fab @click="addTest">
        <v-icon> {{icons.mdiPlus}} </v-icon>
      </v-btn>
      
      <v-btn small class="mx-1" fab @click="changeMode">
        <v-icon> {{icons.mdiPencil}} </v-icon>
      </v-btn>
    </v-container>

    <v-container class="selector d-flex align-center flex-nowrap">
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
        max-width
      ></v-select>

      <v-btn fab x-small class='ml-1 mr-3'>
        <v-icon> {{icons.mdiClose}} </v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="newFile" rounded class="mx-1" min-width="65px" small>new</v-btn>
      <v-btn @click="openFile" rounded class="mx-1" min-width="65px" small>open</v-btn>
      <v-btn @click="saveFile" rounded class="mx-1" min-width="65px" small>save</v-btn>
    </v-container>

    <v-dialog max-width="40%" :value="activateAddTestCaseDialogVal">
      <AddTestCaseDialog></AddTestCaseDialog>
    </v-dialog>
  </v-container>
</template>

<script>
const { dialog } = require("electron").remote;

import CodeFile from "@/utils/CodeFile";
import AddTestCaseDialog from "@/components/AddTestCaseDialog";

import {
    mdiPlay,
    mdiCached,
    mdiPlus,
    mdiPencil,
    mdiClose
  } from '@mdi/js';

export default {


  components: {
    AddTestCaseDialog
  },

  data(){
    return {
      icons: {
        mdiPlus,
        mdiCached,
        mdiPencil,
        mdiPlay,
        mdiClose,
      }
    }
  },

  methods: {
    runCode: function() {
      const fb = this.$store.state.activeCodeFile.runCode();
      this.$store.commit("notify", {
        type: fb.type,
        msg: `[${fb.time}][${this.$store.state.activeCodeFile.text}]\n${fb.msg}`
      });
    },

    compileRunCode: function() {
      const fb = this.$store.state.activeCodeFile.compileRunCode();
      this.$store.commit("notify", {
        type: fb.type,
        msg: `[${this.$store.state.activeCodeFile.text}]\n${fb.msg}`
      });
    },

    addTest: function() {
      this.$store.commit("changeAddTestCasesDialogState");
    },

    changeMode: function() {
      this.$store.commit("changeCustomTestsMode");
    },

    changeActiveFile: function() {
      this.$store.state.editor._editor.setModel(this.activeFile);
    },

    newFile: function() {
      var targetPath = dialog.showSaveDialogSync();

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

      for (var item of targetPath) {
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
      this.$store.commit("notify", {
        type: "info",
        msg: "File saved successfully!"
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

    activateAddTestCaseDialogVal() {
      return this.$store.state.activateAddTestCaseDialog;
    }
  }
};
</script>

<style>

.runBtn {
  margin-top: 2px;
}

.selector {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}

.problemSelector {
  max-width: 50%;
}

</style>