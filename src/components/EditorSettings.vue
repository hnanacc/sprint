<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-subheader>THEME</v-subheader>
      </v-col>

      <v-radio-group mandatory class="ma-0" dense row>
        <v-radio class="ml-12" dense label="Dark"></v-radio>
        <v-radio class="ml-12" dense label="Light"></v-radio>
      </v-radio-group>

      <v-col cols="12" class="pa-0">
        <v-subheader>FONT FAMILY</v-subheader>
      </v-col>

      <v-radio-group mandatory class="ma-0" dense row>
        <v-radio class="ml-12" dense label="Default"></v-radio>
        <v-radio class="ml-12" dense label="Fira Mono"></v-radio>
        <v-radio class="ml-12" dense label="Monospace"></v-radio>
      </v-radio-group>

      <v-col cols="12" class="pa-0">
        <v-subheader>FONT SIZE</v-subheader>
      </v-col>

      <v-slider
        class="mx-5 mt-6"
        v-model="fontSize"
        :append-icon="icons.mdiMagnifyPlus"
        :prepend-icon="icons.mdiMagnifyMinus"
        @click:append="zoomIn"
        @click:prepend="zoomOut"
        thumb-label="always"
        thumb-size="25"
        thumb-color="pink"
      ></v-slider>

      <v-col cols="12" class="pa-0">
        <v-subheader>FEATURES</v-subheader>
      </v-col>

      <v-col cols="12" class="pa-0 d-flex justify-space-around">
        <v-checkbox dense label="Autocomplete"></v-checkbox>
        <v-checkbox dense label="Intellisense"></v-checkbox>
        <v-checkbox dense label="Linting"></v-checkbox>
        <v-checkbox dense label="Snippets"></v-checkbox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiMagnifyPlus, mdiMagnifyMinus } from "@mdi/js";

export default {
  data: function() {
    return {
      icons: {
        mdiMagnifyPlus,
        mdiMagnifyMinus
      }
    };
  }
};
</script>