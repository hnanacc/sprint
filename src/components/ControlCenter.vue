<template>
  <v-container class="ma-0 pa-0">
    <v-container class="selector d-flex align-center flex-nowrap">
        <v-select label="Select problem" :items="files" hide-details dense outlined></v-select>
        <v-btn @click="openFile" class="ml-2" small>new file</v-btn>
        <v-btn @click="openFolder" class="ml-2" small>open folder</v-btn>
    </v-container>
    <v-container class="root d-flex justify-space-around">
      <v-btn small @click="runCode">run code</v-btn>
      <v-btn small @click="compileRunCode">compile/run code</v-btn>
      <v-btn small @click="addTest">add testcase</v-btn>
      <v-btn small @click="addFile">custom tests</v-btn>
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
    addFile: function() {
      alert("Adding File...");
    },
    openFolder: function() {
        alert("New Folder opening...");
    },
    openFile: function(){
      alert("Create a new file...");
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