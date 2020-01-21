<template>
  <MonacoEditor class="editor" v-model="code" :options="options" language="python" :theme="themeMode"/>
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