<template>
  <div>
    <v-app-bar :bottom="bottomToolBar" dense app>
      <v-toolbar-title>
        <v-progress-circular :indeterminate="statusLoader" width="2" size="20"></v-progress-circular>
        <span class="caption ml-2">{{ curEvent }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn small text router to="/" exact>controls</v-btn>

      <v-btn small text router to="/terminal" exact @click="setTerminal">terminal</v-btn>

      <v-menu right min-width="150px">
        <template v-slot:activator="{on}">
          <v-btn small text fab v-on="on">
            <v-icon>{{icons.mdiMenu}}</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item 
            v-for="(option, idx) in options" 
            :key="idx" :router="option.isLink"
            :to="option.link"
            @click="option.action"
            exact>
              <v-list-item-title>{{option.title}}</v-list-item-title>
            </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mdiMenu } from "@mdi/js";

import "@/utils/CompetitiveCompanion";

export default {
  data() {
    return {
      icons: {
        mdiMenu,
        
      },
      
      options: [
          {
            title: 'Settings',
            link: '/settings',
            isLink: true,
            action: function(){
              console.log(`moved to settings`);
            }
          },

        ]
    };
  },

  computed: {
    bottomToolBar() {
      return !this.$store.state.isTopStatusBar;
    },

    curEvent() {
      return this.$store.state.status;
    },

    statusLoader() {
      return this.$store.state.processRunning;
    },

  },

  methods: {
    setTerminal: function() {
      this.$store.state.console.focus();
    }
  }
};
</script>
