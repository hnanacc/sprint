<template>
  <MonacoEditor class="editor" v-model="code" :options="options" :language="curCodeFileLang" :theme="themeMode"/>
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  components: {
    MonacoEditor
  },

  computed:{
    themeMode(){
      return this.$vuetify.theme.dark ? 'vs-dark' : 'vs-light';
    },

    curCodeFileLang(){
      return (this.$store.state.activeCodeFile ? this.$store.state.activeCodeFile.lang : 'cpp');
    }
  },

  data() {
    return {
      code: "#include <bits/stdc++.h>",

      options: {
        mouseWheelZoom: true,
        minimap: {
          enabled: false
        },
        fontSize: 16,
        automaticLayout: true // turn this off later as it hits performance.
      }
    };
  }
};
</script>

<style>
.editor {
  height: 100%;
}
</style>