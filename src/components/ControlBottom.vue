<template>
  <div class="bottomContainer">
    <div class="controlShare">
      <ControlNormalMode v-if="customModeState"></controlNormalMode>
      <ControlCustomMode v-else></controlCustomMode>
    </div>
    <EventLogger class="logger"></EventLogger>
  </div>
</template>

<script>

import ControlCustomMode from '@/components/ControlCustomMode.vue';
import ControlNormalMode from '@/components/ControlNormalMode.vue';
import EventLogger from '@/components/EventLogger.vue';

export default {
  components: {
    ControlNormalMode,
    ControlCustomMode,
    EventLogger
  },

  computed: {
    customModeState(){
      return this.$store.state.layout.customTestsMode;
    }
  }
};
</script>

<style>

.bottomContainer {
  height: 100%;
  width: 100%;
}

.controlShare {
  height: 60%;
  width: 100%;
}

.logger {
  height: 40%;
  width: 100%;
}


</style>