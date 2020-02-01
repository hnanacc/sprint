import 'xterm/css/xterm.css';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

const os = require('os');
const pty = require('node-pty');

class Console {

    constructor() {

        this.pty = this.spawnPty();
        this.console = new Terminal();

        this.fitAddon = new FitAddon();
        this.webLinksAddon = new WebLinksAddon();

        this.console.loadAddon(this.fitAddon);
        this.console.loadAddon(this.webLinksAddon);

        this.observeEvents();
    }

    activate() {
        this.console.open(document.getElementById('terminal'));
        this.adjustConsoleSize();
        this.console.focus();
    }

    focus() {
        this.console.focus();
    }

    adjustConsoleSize() {
        if (!this.console || !this.pty) {
            return;
        }

        this.console.element.style.padding = '5px';
        this.fitAddon.fit();

        const elemDim = getComputedStyle(document.getElementById('terminal'));
        const consoleDim = getComputedStyle(this.console.element);

        const elemHeight = parseInt(elemDim.height, 10);
        const consoleHeight = parseInt(consoleDim.height, 10);

        const newPadding = elemHeight - consoleHeight + 5;

        if (isNaN(newPadding)) {
            this.fitAddon.fit();
            this.console.element.style.paddingBottom = `${newPadding}px`;
        }

        if (this.pty && this.console) {
            this.pty.resize(this.console.cols, this.console.rows);
        }
    }

    spawnPty() {
        const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

        const ptyObj = pty.spawn(shell, [], {
            name: 'xterm-color',
            env: process.env,
            cwd: os.homedir(),
        });

        return ptyObj;
    }

    observeEvents() {

        this.console.onData((data) => {
            this.pty.write(data);
        })

        this.pty.onData((data) => {
            if (this.console.element) {
                return this.console.write(data);
            }
        })

    }

    destroy() {
        if (this.pty) this.pty.kill();
        if (this.console) this.console.dispose();
    }


}

export default new Console();