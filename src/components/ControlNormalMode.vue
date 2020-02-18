<template>
  <v-container style="overflow-y:auto!important" fluid>
    <v-card flat class="flex-grow-1" v-if="showBackground">
      <v-card-text class="text-center">{{backgroundText}}</v-card-text>
    </v-card>

    <v-row justify="start" align="center" v-if="!showBackground">
      <v-col class="ma-1 shrink my-2 pa-0" v-for="(test, idx) in testcases" :key="idx">
        <v-chip
          v-show="test.state"
          close
          :color="test.status"
          @click="openTestcase(idx)"
          @click:close="removeTestcase(idx)"
        >Testcase #{{idx + 1}}</v-chip>
      </v-col>
    </v-row>

    <v-dialog max-width="80%" :value="showTestCaseDialogState">
      <ShowTestCaseDialog></ShowTestCaseDialog>
    </v-dialog>
  </v-container>
</template>

<script>
import ShowTestCaseDialog from "@/components/ShowTestCaseDialog";

export default {
  components: {
    ShowTestCaseDialog
  },

  methods: {
    openTestcase: function(idx) {
      this.$store.commit("changeShowTestCaseDialogState", idx);
    },

    removeTestcase: function(idx) {
      this.$store.state.activeCodeFile.removeTestCase(idx);
    }
  },

  computed: {
    testcases() {
      if (this.$store.state.activeCodeFile) {
        return this.$store.state.activeCodeFile.getTestCases();
      } else {
        return [];
      }
    },

    showTestCaseDialogState() {
      return this.$store.state.showTestCaseDialogState;
    },

    showBackground() {
      return false;
    },

    backgroundText() {
      if (this.$store.state.activeCodeFile) {
        return "No test cases added";
      } else {
        return "Create/Open a new file";
      }
    }
  }
};
</script>
