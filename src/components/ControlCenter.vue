<template>
  <v-container class="ma-0 pa-0">

    <v-container class="d-flex justify-space-around">
      <v-btn small class="blue" @click="runCode">run code</v-btn>
      <v-btn small @click="compileRunCode">compile/run code</v-btn>
      <v-btn small @click="addTest">add testcase</v-btn>
      <v-btn small @click="changeMode">{{modeBtnText}}</v-btn>
    </v-container>

    <v-container class="selector d-flex align-center flex-nowrap">
        <v-select label="Select problem" :items="files" @change="changeActiveFile" v-model="activeFile" hide-details dense outlined></v-select>
        <v-btn @click="newFile" class="ml-2" small>new file</v-btn>
        <v-btn @click="openFile" class="ml-2" small>open file</v-btn>
        <v-btn @click="saveFile" class="ml-2" small> save file </v-btn>
    </v-container>

  </v-container>
</template>

<script>


export default {

  methods: {

    runCode: function(){
      this.$store.state.activeCode.runCode();
    },

    compileRunCode: function(){
      this.$store.state.activeCode.compileRunCode();
    },

    addTest: function(){
      this.$store.state.activeCode.addTestCase(1);
    },

    changeMode: function(){
      this.$store.commit('changeCustomTestsMode');
    },
    
    changeActiveFile: function(){
      this.$store.state.allCodeFiles.forEach((item) => {
        if(item.name === this.activeFile) {
          this.$store.commit('changeActiveFile', item);
        }
      })
    },

    newFile: function(){
      console.log('Added a new file...');
    },

    openFile: function(){
      console.log('openfile...')
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