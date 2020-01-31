<template>
  <v-container
    fill-height
    fluid
    class="pa-1"
  >
    <textarea class="textbox" placeholder="Custom testcases"></textarea>
  </v-container>
</template>

<script>
export default {
    
}
</script>

<style>
  .textbox {
    height: 100%;
    width: 100%;
    outline: none;
    font-family: monospace;
    background-color: black;
    resize: none;
    padding: 5px;
  }
</style>