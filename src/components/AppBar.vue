<template>
<div>
  <v-app-bar :bottom="bottomToolBar" dense app>
    <v-toolbar-title>
      <span class="caption font-weight-bold">PROBLEM:</span>
      <span class="subtitle-2"> {{ title }}</span>
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
</div>
</template>

<script>
export default {
  data() {
    return {
      title: "A",
      routes: [
        {
          name: "Controls",
          link: "/"
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
  },

  computed: {
    bottomToolBar(){
      return this.$store.state.layout.bottomToolBar;
    }
  }
};
</script>
