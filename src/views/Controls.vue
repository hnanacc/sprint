<template>
    <v-container fill-height fluid class="d-flex flex-column flex-nowrap pa-0">
        <ControlTop class="flex-grow-1"></ControlTop>
        <ControlCenter></ControlCenter>
        <ControlBottom></ControlBottom>
    </v-container>
</template>

<script>

import ControlTop from '@/components/ControlTop.vue';
import ControlCenter from '@/components/ControlCenter.vue';
import ControlBottom from '@/components/ControlBottom.vue';

export default {
    components: {
        ControlTop,
        ControlCenter,
        ControlBottom
    }
}
</script>