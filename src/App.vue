<template>
  <v-app app>

    <!-- App bar -> default on the top  -->
    <AppBar></AppBar>
    
    <!-- Navigation panel -> default on the right  -->
    <v-navigation-drawer permanent :right="rightNavDrawer" width="40%" app>
      <router-view></router-view>
    </v-navigation-drawer>

    

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