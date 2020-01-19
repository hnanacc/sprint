<template>
  <div id="terminal"></div>
</template>

<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";

const pty = require('node-pty');

const shell = "SHELL";

const ptyProc = pty.spawn(shell, [], {
  name: "xterm-color",
  env: process.env
});

export default {
  data() {
    return {
      term: null
    };
  },

  mounted() {
    alert(this.$el + "is mounted...");

    this.term = new Terminal();
    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    this.term.loadAddon(fitAddon);
    this.term.loadAddon(webLinksAddon);

    this.term.open(document.getElementById("terminal"));
    fitAddon.fit();

    this.term.onData(data => ptyProc.write(data));

    ptyProc.on("data", function(data) {
      this.term.write(data);
    });

    this.term.onResize(size => {
      ptyProc.resize(
        Math.max(size ? size.cols : this.term.cols, 1),
        Math.max(size ? size.rows : this.term.rows, 1)
      );
    });

    alert("going");
  }
};
</script>