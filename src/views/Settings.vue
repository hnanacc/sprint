<template>
  <div>
    <v-tabs v-model="tab" grow>
      <v-tab>General</v-tab>
      <v-tab>Editor</v-tab>
      <v-tab>Languages</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" mandatory>
        <v-tab-item>
            <GeneralSettings></GeneralSettings>
        </v-tab-item>
        <v-tab-item>
            <EditorSettings></EditorSettings>
        </v-tab-item>
        <v-tab-item>
            <LanguageSettings></LanguageSettings>
        </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>

import GeneralSettings from '@/components/GeneralSettings.vue';
import EditorSettings from '@/components/EditorSettings.vue';
import LanguageSettings from '@/components/LanguageSettings.vue';

export default {
    components: {
        GeneralSettings,
        EditorSettings,
        LanguageSettings
    },

    data: function(){
        return {
            tab: null,
        }
    }
};
</script>