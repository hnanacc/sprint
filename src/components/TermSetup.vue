<template>
  <div class="black" id="terminal"></div>
</template>

<script>

import Console from '@/utils/Console';

export default {

  mounted: function(){
    this.$store.state.term = Console;
    Console.activate();
  },

  
}
</script>

<style>
  #terminal{
    height: 100%;
    width: 100%;
  }
</style>