<template>
    <v-container fluid>
        <v-switch v-model="darkmode" label="Enable Dark mode">
        </v-switch>
    </v-container>
</template>

<script>
export default {
    computed: {
        darkmode: {
            get(){
                return this.$vuetify.theme.dark;
            },
            
            set(){
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
             }
        }
    },    
}
</script>