<template>
  <div class="black pa-1" id="terminal"></div>
</template>

<script>

export default {

  mounted: function(){
    this.$store.commit('initConsole');
  },

  
}
</script>

<style>
  #terminal{
    height: 100%;
    width: 100%;
  }
</style>