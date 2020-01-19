<template>
  <v-container class="ma-0 pa-0">
    <v-container class="selector d-flex align-center flex-nowrap">
        <v-select label="Select problem" :items="files" hide-details dense outlined></v-select>
        <v-btn @click="openFolder" class="ml-3" small>open folder</v-btn>
    </v-container>
    <v-container class="root d-flex justify-space-around">
      <v-btn small @click="runCode">run code</v-btn>
      <v-btn small @click="compileRunCode">compile/run code</v-btn>
      <v-btn small @click="addTest">add testcase</v-btn>
      <v-btn small @click="addFile">add file</v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  methods: {
    runCode: function() {
      console.log("Running code...");
    },
    compileRunCode: function() {
      console.log("Compiling and running code...");
    },
    addTest: function() {
      console.log("Test Added...");
    },
    addFile: function() {
      console.log("Adding File...");
    },
    openFolder: function() {
        console.log("New Folder opening...")
    }
  },

  data(){
      return {
          files: [
              "A.cpp", "B.cpp", "C.cpp", "D.cpp", "E.cpp", "F.cpp"
          ]
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