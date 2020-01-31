<template>
  <v-container
    style="overflow-y:auto!important"
    class="flex-grow-1"
    fill-height
    fluid
  >
    <v-row align="center" justify="start">
      <v-col class="ma-1 my-2 pa-0" v-for="test in testcases" :key="test.name">
        <v-chip
          v-show="test.state"
          close
          :color="test.color"
          @click="openTestcase"
          @click:close="test.state = !test.state"
        >{{test.name}}</v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    openTestcase: function() {
      alert("opened test case");
    }
  },

  computed: {
    testcases(){
      return this.$store.activeCodeFile.testcases;
    }
  }
  
  
};
</script>