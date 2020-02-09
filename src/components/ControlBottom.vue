<template>
  <div class="bottomContainer">
    <div class="controlShare">
      <ControlNormalMode v-if="!customModeState"></controlNormalMode>
      <ControlCustomMode v-else></controlCustomMode>
    </div>
    <Notifier class="logger"></Notifier>
  </div>
</template>

<script>

import ControlCustomMode from '@/components/ControlCustomMode.vue';
import ControlNormalMode from '@/components/ControlNormalMode.vue';
import Notifier from '@/components/Notifier.vue';

export default {
  components: {
    ControlNormalMode,
    ControlCustomMode,
    Notifier
  },

  computed: {
    customModeState(){
      return this.$store.state.customInputMode;
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