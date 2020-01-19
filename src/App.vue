<template>
  <v-app app>
    
    <!-- Navigation panel -> default on the right  -->
    <!-- max-height is by default 100% - height of appbar. It is important to set -->
    <v-navigation-drawer :right="rightNavDrawer" permanent style="max-height:100vh !important" width="40%" app>
      <router-view></router-view>
    </v-navigation-drawer>

    <!-- App bar -> default on the top  -->
    <AppBar></AppBar>

    <!-- editor container -->
    <v-content><Monaco></Monaco></v-content>

  </v-app>
</template>

<script>

import Monaco from '@/editor/Monaco.vue';
import AppBar from '@/components/AppBar.vue';

export default {
  components: {
    Monaco,
    AppBar
  },
  data(){
    return {
      rightNavDrawer: true,
    }
  }
};
</script>

<style>
  ::-webkit-scrollbar{
    height: 4px;
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: grey;
  }
</style>