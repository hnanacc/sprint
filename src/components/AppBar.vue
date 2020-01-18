<template>
  <v-app-bar :bottom="bottomAppBar" dense app>
    <v-toolbar-title>
      <span class="subtitle-1 font-weight-bold">Problem: {{ title }}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      small
      v-for="btn in routes"
      :key="btn.name"
      text
      router
      :to="btn.link"
      exact
    >{{ btn.name }}</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      bottomAppBar: true,
      title: "A",
      routes: [
        {
          name: "Controls",
          link: "/"
        },
        {
          name: "test/tools",
          link: "/testsuite"
        },
        {
          name: "terminal",
          link: "/terminal"
        },
        {
          name: "settings",
          link: "/settings"
        }
      ]
    };
  }
};
</script>
