<template>
  <v-container class="purple" fill-height fluid>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
        currentFile: 0,
        currentTest: -1,
      items: ["A.cpp", "B.cpp", "C.cpp", "D.cpp","D.cpp","D.cpp","D.cpp","D.cpp","D.cpp","D.cpp","D.cpp"],
      testcases: ["Testcase #1", "Testcase #2", "Testcase #3", "Testcase #4"]
    };
  }
};
</script>