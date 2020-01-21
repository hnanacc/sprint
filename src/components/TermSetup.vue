<template>
  <v-container fluid class="pa-1">
    <div style="overflow-y:scroll!important overflow-x:hidden!important" class="pa-1 black" id="terminal"></div>
  </v-container>
</template>

<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
// import { WebLinksAddon } from "xterm-addon-web-links";

const os = require("os");
const pty = require("node-pty");

const shell = process.env[os.platform() === "win32" ? "COMSPEC" : "SHELL"];

const ptyProc = pty.spawn(shell, [], {
  name: "xterm-color",
  env: process.env
});

const term = new Terminal({
  rows: 40,
  experimentalCharAtlas: "dynamic"
});

const fitAddon = new FitAddon();

term.loadAddon(fitAddon);

export default {
  data() {
    return {
      term: null
    };
  },

  mounted() {
    console.log("entered");

    term.open(document.getElementById("terminal"));
    term.write("Sprint Terminal v0.1.0\n");

    fitAddon.fit();

    console.log("exiting...");
  }
};

term.onData(data => ptyProc.write(data));
ptyProc.on("data", function(data) {
  console.log(data);
  term.write(data);
});

term.onResize(size => {
  ptyProc.resize(
    Math.max(size ? size.cols : term.cols, 1),
    Math.max(size ? size.rows : term.rows, 1)
  );
});
</script>