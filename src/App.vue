<template>
  <v-app app>
    
    <v-navigation-drawer permanent right width="40%" app>
      <router-view> </router-view>
    </v-navigation-drawer>

    <v-app-bar dense app>
    </v-app-bar>

    <v-content>
      <div id="editor"></div>
    </v-content>

  </v-app>
</template>