<template>
  <v-container class="ma-0 pa-0">
    <v-container class="d-flex">
      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="blue mx-1 runBtn"
            v-on="on"
            min-width="100px"
            rounded
            @click="compileRunCode"
            v-shortkey="['shift', 'enter']"
            @shortkey="compileRunCode"
          >
            <v-icon left>{{icons.mdiPlay}}</v-icon>run
          </v-btn>
        </template>
        <span>Compile & Run Code</span>
      </v-tooltip>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            class="mx-1"
            v-on="on"
            fab
            @click="runCode"
            v-shortkey="['ctrl', 'shift', 'enter']"
            @shortkey="runCode"
          >
            <v-icon>{{icons.mdiCached}}</v-icon>
          </v-btn>
        </template>
        <span>Run Code</span>
      </v-tooltip>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn small class="mx-1" v-on="on" fab @click="formatLintCode">
            <v-icon>{{icons.mdiCodeTagsCheck}}</v-icon>
          </v-btn>
        </template>
        <span>Format & Lint Code</span>
      </v-tooltip>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn small class="mx-1" v-on="on" fab @click="copyCode">
            <v-icon>{{icons.mdiContentCopy}}</v-icon>
          </v-btn>
        </template>
        <span>Copy Code</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            class="mx-1"
            v-on="on"
            fab
            @click="changeAddTestCaseDialogState"
            v-shortkey="['alt', '+']"
            @shortkey="changeAddTestCaseDialogState"
          >
            <v-icon>{{icons.mdiPlus}}</v-icon>
          </v-btn>
        </template>
        <span>Add Testcase</span>
      </v-tooltip>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            class="mx-1"
            v-on="on"
            fab
            @click="saveTestCases"
            v-shortkey="['ctrl', 't']"
            @shortkey="saveTestCases"
          >
            <v-icon>{{icons.mdiArrowDown}}</v-icon>
          </v-btn>
        </template>
        <span>Save Testcases</span>
      </v-tooltip>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            class="mx-1"
            v-on="on"
            fab
            @click="loadTestCases"
            v-shortkey="['ctrl', 'l']"
            @shortkey="loadTestCases"
          >
            <v-icon>{{icons.mdiArrowUp}}</v-icon>
          </v-btn>
        </template>
        <span>Load Testcases</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            class="mx-1"
            v-on="on"
            fab
            v-shortkey="['f1']"
            @shortkey="changeCustomInputMode"
            @click="changeCustomInputMode"
          >
            <v-icon>{{icons.mdiPencil}}</v-icon>
          </v-btn>
        </template>
        <span>Toggle Custom IO</span>
      </v-tooltip>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            class="mx-1 mr-2"
            v-on="on"
            fab
            @click="stressTest"
            v-shortkey="['ctrl', 'p']"
            @shortkey="stressTest"
          >
            <v-icon>{{icons.mdiHammer}}</v-icon>
          </v-btn>
        </template>
        <span>Perform Stress Test</span>
      </v-tooltip>
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

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            @click="closeCodeFile"
            fab
            x-small
            class="ml-1 mr-3"
            v-shortkey="['ctrl', 'w']"
            @shortkey="closeCodeFile"
          >
            <v-icon>{{icons.mdiClose}}</v-icon>
          </v-btn>
        </template>
        <span>Close Current File</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            @click="newCodeFile"
            rounded
            class="mx-1"
            min-width="65px"
            small
            v-shortkey="['ctrl', 'n']"
            @shortkey="newCodeFile"
          >new</v-btn>
        </template>
        <span>Create New File</span>
      </v-tooltip>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            @click="openCodeFiles"
            rounded
            class="mx-1"
            min-width="65px"
            small
            v-shortkey="['ctrl', 'o']"
            @shortkey="openCodeFiles"
          >open</v-btn>
        </template>
        <span>Open Files</span>
      </v-tooltip>

      <v-tooltip open-delay="500" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            @click="saveCodeFile"
            rounded
            class="mx-1"
            min-width="65px"
            small
            v-shortkey="['ctrl', 's']"
            @shortkey="saveCodeFile"
          >save</v-btn>
        </template>
        <span>Save File</span>
      </v-tooltip>
    </v-container>

    <v-dialog max-width="40%" :value="addTestCaseDialogState">
      <AddTestCaseDialog></AddTestCaseDialog>
    </v-dialog>
  </v-container>
</template>

<script>
// Components.
import AddTestCaseDialog from "@/components/AddTestCaseDialog";

// Material icons.
import {
  mdiPlay,
  mdiCached,
  mdiPlus,
  mdiPencil,
  mdiClose,
  mdiCodeTagsCheck,
  mdiArrowUp,
  mdiArrowDown,
  mdiContentCopy,
  mdiHammer
} from "@mdi/js";

export default {
  components: {
    AddTestCaseDialog
  },

  data() {
    return {
      icons: {
        mdiPlus,
        mdiCached,
        mdiPencil,
        mdiPlay,
        mdiClose,
        mdiCodeTagsCheck,
        mdiArrowUp,
        mdiArrowDown,
        mdiContentCopy,
        mdiHammer
      }
    };
  },

  computed: {
    files() {
      return this.$store.state.allCodeFiles;
    },

    selected: {
      get: function() {
        return this.$store.state.activeCodeFile;
      },

      set: function(setCodeFile) {
        this.$store.commit("setCodeFile", setCodeFile);
      }
    },

    addTestCaseDialogState() {
      return this.$store.state.addTestCaseDialogState;
    }
  },

  methods: {
    compileRunCode: function() {
      this.$store.state.notifier.reset();
      this.$store.dispatch("compileRunCode");
    },

    runCode: function() {
      this.$store.state.notifier.reset();
      this.$store.dispatch("runCode");
    },

    formatLintCode: function() {
    },

    copyCode: function() {
      this.$store.dispatch("copyToClipboard");
    },

    changeAddTestCaseDialogState: function() {
      this.$store.commit("changeAddTestCaseDialogState");
    },

    saveTestCases: function() {
      this.$store.dispatch("saveTestCases");
    },

    loadTestCases: function() {
      this.$store.dispatch("loadTestCases");
    },

    changeCustomInputMode: function() {
      this.$store.commit("changeCustomInputMode");
    },

    stressTest: function() {
      alert(
        "This feature is currently in DEVELOPMENT phase. Will be soon available!"
      );
    },

    closeCodeFile: function() {
      this.$store.dispatch("closeCodeFile");
    },

    newCodeFile: function() {
      this.$store.dispatch("newCodeFile");
    },

    openCodeFiles: function() {
      this.$store.dispatch("openCodeFiles");
    },

    saveCodeFile: function() {
      this.$store.dispatch("saveCodeFile");
      this.$store.dispatch("notify", {
        type: "info",
        msg: "Code saved successfully !"
      });
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