<template>
  <v-container
    style="overflow-y:auto!important"
    class="justify-center align-start ma-0 pa-2"
    fill-height
    fluid
  >
    <v-row align="center" justify="start">
      <v-col class="ma-1 my-2 pa-0" v-for="test in testcases" :key="test.name">
        <v-chip
          v-show="test.state"
          close
          :color="test.color"
          @click="openTestcase"
          @click:close="test.state = !test.state"
        >{{test.name}}</v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    openTestcase: function() {
      alert("opened test case");
    }
  },
  data() {
    return {
      currentFile: 0,
      currentTest: -1,
      items: [
        "A.cpp",
        "B.cpp",
        "C.cpp",
        "D.cpp",
        "D.cpp",
        "D.cpp",
        "D.cpp",
        "D.cpp",
        "D.cpp",
        "D.cpp",
        "D.cpp"
      ],
      testcases: [
        {
          name: "Testcase #1",
          state: true,
          color: "success",
          data: {
            expected: [1, 2, 3],
            actual: [1, 2, 3]
          }
        },
        {
          name: "Testcase #2",
          state: true,
          color: "success",
          data: {
            expected: [1, 2, 3],
            actual: [1, 2, 3]
          }
        },
        {
          name: "Testcase #3",
          state: true,
          color: "default",
          data: {
            expected: [1, 2, 3],
            actual: [1, 2, 3]
          }
        },
        {
          name: "Testcase #4",
          color: "success",
          state: true,
          data: {
            expected: [1, 2, 3],
            actual: [1, 2, 3]
          }
        },
        {
          name: "Testcase #5",
          color: "error",
          state: true,
          data: {
            expected: [1, 2, 3],
            actual: [1, 2, 3]
          }
        }
      ]
    };
  }
};
</script>