<template>
    <v-container fluid>
        <v-switch v-model="darkmode" @change="changeTheme" label="Enable Dark mode">
        </v-switch>
    </v-container>
</template>

<script>
export default {
    computed: {
        darkmode(){
            return this.$vuetify.theme.dark;
        }
    },
    methods: {
        changeTheme: function() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        }
    }
    
}
</script>