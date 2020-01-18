<template>
    <v-container fluid>
        <v-switch v-model="darkmode" @change="changeTheme" label="Enable Dark mode">
        </v-switch>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            darkmode: true,
        }
    },
    methods: {
        changeTheme: function() {
            this.$vuetify.theme.dark = this.darkmode;
        }
    }
    
}
</script>