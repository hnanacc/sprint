<template>
    <v-container fluid>

        <v-row>
            <v-col cols="12" class="pa-0">
                <v-subheader> THEME </v-subheader>
            </v-col>
            <v-radio-group mandatory class="ma-0" dense row>
                <v-radio class="ml-12" dense label="Dark"></v-radio>
                <v-radio class="ml-12" dense label="Light"></v-radio>
            </v-radio-group>

            <v-col cols="12" class="pa-0">
                <v-subheader> STATUS BAR POSITION </v-subheader>
            </v-col>

            <v-radio-group mandatory class="ma-0" dense row>            
                <v-radio class="ml-12" dense label="Top"></v-radio>
                <v-radio class="ml-12" dense label="Bottom"></v-radio>
            </v-radio-group>

            <v-col cols="12" class="pa-0">
                <v-subheader> DOCK POSITION </v-subheader>
            </v-col>

            <v-radio-group mandatory class="ma-0" dense row>
                <v-radio class="ml-12" dense row label="Left"></v-radio>
                <v-radio class="ml-12" dense row label="Right"></v-radio>                
            </v-radio-group>

        </v-row>

    </v-container>
</template>

<script>
export default {
    
}
</script>