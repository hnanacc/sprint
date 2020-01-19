<template>
    <v-container class="root d-flex justify-space-around">
        <v-btn small @click="runCode"> run code </v-btn>
        <v-btn small @click="compileRunCode"> compile/run code </v-btn>
        <v-btn small @click="addTest"> add testcase </v-btn>
        <v-btn small @click="addFile"> add file </v-btn>
    </v-container>
</template>

<script>
export default {
    methods: {
        runCode: function(){
            console.log("Running code...")
        },
        compileRunCode: function(){
            console.log("Compiling and running code...")
        },
        addTest: function(){
            console.log("Test Added...")
        },
        addFile: function(){
            console.log("Adding File...")
        }
    }
}
</script>

<style>
    .root {
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
    }
</style>