<template>
  <v-app app>
    
    <!-- Navigation panel -> default on the right  -->
    <!-- max-height is by default 100% - height of appbar. It is important to set -->
    <v-navigation-drawer class="drawer" :right="rightPanel" style="max-height:100vh !important" width="40%" app>
      <router-view></router-view>
    </v-navigation-drawer>

    <!-- App bar -> default on the bottom -->
    <AppBar></AppBar>

    <!-- editor container -->
    <v-content class="d-flex"><Monaco class="flex-grow-1"></Monaco></v-content>

  </v-app>
</template>

<script>

import Monaco from '@/components/Monaco.vue';
import AppBar from '@/components/AppBar.vue';

export default {

  created: function(){
    this.$store.commit('initStore');
  },

  mounted: function(){
    if(this.$store.state.isDarkTheme){
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }
  },

  components: {
    Monaco,
    AppBar
  },
  computed:{
    rightPanel(){
      return !this.$store.state.isLeftDock;
    },
  },
};
</script>

<style>

  .drawer {
    border-left: 1px solid grey;
    border-right: 1px solid grey;
  }

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