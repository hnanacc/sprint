<template>
  <div class="textContainer pa-1">
    <textarea readonly class="textbox" v-text="text"></textarea>
  </div>
</template>

<script>
export default {
  computed: {
    text(){
      return "Build Messages..."
    }
  }
};
</script>

<style>
.textContainer {
  width: 100%;
  height: 80%;
  box-sizing: border-box;
}

.textbox {
  box-sizing: border-box;
  padding: 10px;
  background: black;
  height: 100%;
  width: 100%;
  resize: none;
  font-family: monospace;
  font-size: 14px;
  overflow-y: scroll;
  outline: none;
}

</style>