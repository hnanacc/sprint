<template>
  <div class="green" id="diffEditor"></div>
</template>

<script>

export default {

  mounted: function(){
    this.$store.commit('initDiffEditor');
  },

  destroyed: function(){
    console.log('Getting destroyed');
  }

}
</script>

<style>
#diffEditor {
  height: 95.5%;
  width: 100%;
}
</style>