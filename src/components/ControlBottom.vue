<template>
  <v-container fluid class="eventLogger pa-0 pt-1 pl-1">
      <v-alert class="ma-1" elevation="10" dismissible v-for="(event, idx) in events" :type="event.type" :key="idx"> {{event.msg}} </v-alert>    
  </v-container>
</template>

<script>
export default {
  computed: {
    events(){
      return this.$store.state.buildMessages;
    }
  }
};
</script>

<style>

  .eventLogger {
    min-height: 40%;
    max-height: 40%;
    overflow-y: scroll;
    border-top: 1px solid grey;
  }


</style>