<template>
<div>
  <v-app-bar :bottom="bottomToolBar" dense app>
    <v-toolbar-title>
      <v-progress-circular :indeterminate="statusLoader" width="2" size="20"></v-progress-circular>
      <span class="caption ml-2"> {{ curEvent }}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

      <v-btn small text router to="/" exact> controls </v-btn>

      <v-btn small text router to="/terminal" exact @click="setTerminal"> terminal </v-btn>

      <v-btn small text router to="/settings" exact> 
        <v-icon> {{icons.mdiMenu}} </v-icon>
      </v-btn>

  </v-app-bar>
</div>
</template>

<script>

import {
  mdiMenu
} from '@mdi/js';

import '@/utils/CompetitiveCompanion';

export default {

  data(){
    return {
      icons: {
        mdiMenu,
      }
    }
  },

  computed: {
    bottomToolBar(){
      return this.$store.state.layout.bottomToolBar;
    },

    curEvent(){
      return this.$store.state.status;
    },

    statusLoader(){
      return this.$store.state.processRunning;
    }
  },

  methods: {
    setTerminal: function(){
      this.$store.state.console.focus();
    }
  }
};
</script>
