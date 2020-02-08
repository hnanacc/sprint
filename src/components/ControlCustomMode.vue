<template>
  <div class="pa-1 bowler">
    <div id="customIO" class="black"></div>
  </div>
</template>

<script>
export default {
  mounted: function() {
    this.$store.commit("initCustomIO");
  }
};
</script>

<style>
.bowler {
  height: 100%;
  width: 100%;
}

#customIO {
  height: 100%;
  width: 100%;
}

/* .textbox {
    height: 100%;
    width: 100%;
    outline: none;
    font-family: monospace;
    background-color: black;
    resize: none;
    padding: 5px;
  } */
</style>