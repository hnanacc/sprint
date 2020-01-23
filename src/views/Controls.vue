<template>
    <v-container fill-height fluid class="d-flex flex-column flex-nowrap pa-0">
        <CustomTestsMode v-if="customTestsMode" class="flex-grow-1"></CustomTestsMode>
        <NormalMode v-else class="flex-grow-1"></NormalMode>
        <ControlCenter></ControlCenter>
        <ControlBottom></ControlBottom>
    </v-container>
</template>

<script>

import NormalMode from '@/components/ControlTopNormalMode.vue';
import CustomTestsMode from '@/components/ControlTopCustomTestsMode.vue';
import ControlCenter from '@/components/ControlCenter.vue';
import ControlBottom from '@/components/ControlBottom.vue';

export default {
    components: {
        NormalMode,
        CustomTestsMode,
        ControlCenter,
        ControlBottom
    },

    computed: {
        customTestsMode(){
            return this.$store.state.layout.customTestsMode
        }
    }
}
</script>