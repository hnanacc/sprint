<template>
    <v-container fluid>

        <v-row>
            <v-col cols="12" class="pa-0">
                <v-subheader> THEME </v-subheader>
            </v-col>
            <v-radio-group v-model="GTheme" mandatory class="ma-0" dense row>
                <v-radio class="ml-12" value="dark" dense label="Dark"></v-radio>
                <v-radio class="ml-12" value="light" dense label="Light"></v-radio>
            </v-radio-group>

            <v-col cols="12" class="pa-0">
                <v-subheader> STATUS BAR POSITION </v-subheader>
            </v-col>

            <v-radio-group v-model="statusPos" mandatory class="ma-0" dense row>            
                <v-radio class="ml-12" value="top" dense label="Top"></v-radio>
                <v-radio class="ml-12" value="bottom" dense label="Bottom"></v-radio>
            </v-radio-group>

            <v-col cols="12" class="pa-0">
                <v-subheader> DOCK POSITION </v-subheader>
            </v-col>

            <v-radio-group v-model="dockPos" mandatory class="ma-0" dense row>
                <v-radio class="ml-12" value="left" dense row label="Left"></v-radio>
                <v-radio class="ml-12" value="right" dense row label="Right"></v-radio>                
            </v-radio-group>

        </v-row>

    </v-container>
</template>

<script>
export default {

    computed: {

            GTheme: {
                get() {

                    if(this.$store.state.isDarkTheme){
                        return 'dark';
                    } else {
                        return 'light';
                    }
                },
                set(newValue) {

                    if(newValue === 'dark'){
                        this.$vuetify.theme.dark = true;
                    } else {
                        this.$vuetify.theme.dark = false;
                    }

                    this.$store.commit('setTheme', newValue);
                }

            },
            statusPos: {
                 get() {
                    if(this.$store.state.isTopStatusBar){
                        return 'top';
                    } else {
                        return 'bottom'
                    }
                },
                set(newValue) {
                    this.$store.commit('setStatusBar', newValue);
                }

            },
            dockPos: {
                 get() {
                    if(this.$store.state.isLeftDock){
                        return 'left';
                    } else {
                        return 'right'
                    }
                },
                set(newValue) {
                    this.$store.commit('setDock', newValue);
                }

            }
        
    },
    
}
</script>