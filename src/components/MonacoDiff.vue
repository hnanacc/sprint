<template>
    <div class="green" id="diffEditor"></div>
</template>

<script>

export default {
    mounted: function(){
        this.$store.state.editor.newDiff(this.$store.state.curTestcase.testcase.stdout,
                                        this.$store.state.curTestcase.testcase.expected);
    }
    
}
</script>

<style>
    #diffEditor {
        height: 95.5%;
        width: 100%;
    }
</style>