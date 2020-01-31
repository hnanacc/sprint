<template>
    <v-container fill-height fluid class="d-flex flex-column flex-nowrap pa-0">
        <ControlTop></ControlTop>
        <ControlBottom></ControlBottom>
    </v-container>
</template>

<script>
import ControlTop from '@/components/ControlTop.vue';
import ControlBottom from '@/components/ControlBottom.vue';

export default {
    components: {
        ControlTop,
        ControlBottom
    },

    computed: {
        customTestsMode(){
            return this.$store.state.layout.customTestsMode
        }
    }
}
</script>
