<template>
    <div id="editor"></div>
</template>

<script>

import Editor from '@/utils/Editor';

export default {
  
  mounted: function(){
    var editor = new Editor();
    this.$store.commit('setEditor', editor);
  },

}
</script>

<style>

  #editor {
    height: 100%;
  }

</style>