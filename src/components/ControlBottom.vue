<template>
  <div class="textContainer">
    <textarea readonly class="textbox" v-text="text"></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n[19.01.19 02:33 AM] Build successful.\n"
    };
  }
};
</script>

<style>
.textContainer {
  width: 100%;
  height: 800px;
  box-sizing: border-box;
  padding: 5px;
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