<template>
  <v-container class="ma-0 pa-0">
    <v-container class="selector d-flex align-center flex-nowrap">
        <v-select label="Select problem" :items="files" hide-details dense outlined></v-select>
        <v-btn @click="addFile" class="ml-2" small>add file</v-btn>
        <v-btn @click="launchSession" class="ml-2" small>launch session</v-btn>
    </v-container>
    <v-container class="root d-flex justify-space-around">
      <v-btn small @click="runCode">run code</v-btn>
      <v-btn small @click="compileRunCode">compile/run code</v-btn>
      <v-btn small @click="addTest">add testcase</v-btn>
      <v-btn small @click="changeMode">{{modeBtnText}}</v-btn>
    </v-container>
  </v-container>
</template>

<script>

export default {

  methods: {
    runCode: function() {
      alert("Running code...");
    },
    compileRunCode: function() {
      alert("Compiling and running code...");
    },
    addTest: function() {
      alert("Test Added...");
    },
    changeMode: function(){
      this.$store.commit('changeCustomTestsMode');
    },
    launchSession: function(){
      this.showDialog = true;
    }
    
  },

  computed: {
    modeBtnText(){
      if(this.$store.state.layout.customTestsMode) {
        return 'normal test';
      } else {
        return 'custom test';
      }
    }
  },

  data(){
      return {
          files: [
              "A.cpp", "B.cpp", "C.cpp", "D.cpp", "E.cpp", "F.cpp"
          ],

          showDialog: false,
      }
  }
};
</script>

<style>
.root {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}

.selector {
    border-top: 1px solid grey;
}

</style>