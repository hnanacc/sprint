<template>
    <div id="editor"></div>
</template>

<script>

export default {

  mounted: function(){
    this.$store.commit('initCodeEditor');
  }
  
}
</script>

<style>

  #editor {
    height: 100%;
  }

</style>