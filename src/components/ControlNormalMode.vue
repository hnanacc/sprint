<template>
  <v-container style="overflow-y:auto!important" fill-height fluid>
    <v-row>
      <v-col class="ma-1 my-2 pa-0" v-for="(test, idx) in testcases" :key="idx">
        <v-chip
          v-show="test.state"
          close
          :color="test.status"
          @click="openTestcase(idx)"
          @click:close="removeTestcase(idx)"
        > Testcase #{{idx + 1}}</v-chip>
      </v-col>
    </v-row>

    <v-dialog max-width="40%" :value="showTestCaseDialogVal">
      <ShowTestCaseDialog></ShowTestCaseDialog>
    </v-dialog>

  </v-container>
</template>

<script>

import ShowTestCaseDialog from "@/components/ShowTestCaseDialog";

export default {

  components: {
    ShowTestCaseDialog,
  },

  methods: {
    openTestcase: function(idx) {
      this.$store.commit('changeShowTestCaseDialogState', idx);
    },

    removeTestcase: function(idx) {
      this.$store.state.activeCodeFile.testcases.splice(idx, 1);
    }
  },

  computed: {
    testcases() {
      if (this.$store.state.activeCodeFile) {
        return this.$store.state.activeCodeFile.testcases;
      } else {
        return [];
      }
    },
    showTestCaseDialogVal(){
      return this.$store.state.activateShowTestCaseDialog;
    }
  }
};
</script>