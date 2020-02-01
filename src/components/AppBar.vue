<template>
<div>
  <v-app-bar :bottom="bottomToolBar" dense app>
    <v-toolbar-title>
      <span class="subtitle-2"> {{ curEvent }}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

      <v-btn small text router to="/" exact> controls </v-btn>

      <v-btn small text router to="/terminal" exact @click="setTerminal"> terminal </v-btn>

      <v-btn small text router to="/settings" exact> settings </v-btn>

  </v-app-bar>
</div>
</template>

<script>
export default {

  computed: {
    bottomToolBar(){
      return this.$store.state.layout.bottomToolBar;
    },

    curEvent(){
      return this.$store.state.curProcess;
    }
  },

  methods: {
    setTerminal: function(){
      this.$store.state.term.focus();
    }
  }
};
</script>
