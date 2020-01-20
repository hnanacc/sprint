<template>
  <MonacoEditor class="editor" v-model="code" :options="options" language="cpp" theme="vs-dark"/>
</template>

<script>
import MonacoEditor from 'vue-monaco'

export default {
  components: {
    MonacoEditor
  },

  data() {
    return {
      code: '#include <bits/stdc++.h>',
      options: {
          mouseWheelZoom: true,
          minimap: {
              enabled: false
          },
          fontSize: 17,
      }
    }
  }
}
</script>

<style>

.editor {
    height: 100%;
}

</style>