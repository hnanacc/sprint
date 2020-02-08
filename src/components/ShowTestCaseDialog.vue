<template>
  <v-card class="showCont d-flex flex-column">
    <v-container fluid class="d-flex pa-0">
      <div>
        <v-card-title>Testcase #{{ testcase_idx + 1 }}</v-card-title>
        <v-card-subtitle>{{testcase.status}}</v-card-subtitle>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="mt-7 mr-7" small @click="closeDialog">close</v-btn>
    </v-container>

    <v-container class="d-flex flex-grow-1 pt-0 flex-nowrap">
      <div class="restView mr-3 d-flex flex-column">
        <p class="caption mb-0">input</p>
        <pre class="testCaseBox pa-1">{{testcase.input}}</pre>
        <p class="caption mt-1 mb-0">stderr</p>
        <pre class="testCaseBox pa-1"> {{testcase.stderr}} </pre>
      </div>
      <div class="diffView">
        <p class="caption mb-0">stdout vs expected</p>
        <MonacoDiff></MonacoDiff>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import MonacoDiff from "@/components/MonacoDiff.vue";

export default {
  components: {
    MonacoDiff
  },

  computed: {
    testcase() {
      console.log(this.$store.state.curTestCase.value);
      return this.$store.state.curTestCase.value;
    },
    testcase_idx(){
        return this.$store.state.curTestCase.idx;
    }
  },

  methods: {
    closeDialog: function() {
      this.$store.commit("changeShowTestCaseDialogState", null);
    }
  }
};
</script>

<style>
.showCont {
  height: 550px;
}

.restView {
  width: 40%;
}

.diffView {
  width: 60%;
}

.testCaseBox {
  overflow: scroll; 
  height: 50%;
  resize: none;
  background-color: black;
  padding: 2px;
  border: 1px solid grey;
  outline: none;
}
</style>
