
import 'xterm/css/xterm.css';
import {Terminal} from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

export default class CustomIO {

    constructor(){
        this.customIO = new Terminal();
        this.fitAddon = new FitAddon();

        this.customIO.loadAddon(this.fitAddon);
    }

    getCustomIO(){
        return this.customIO;
    }

    clear(){
        this.customIO.clear();
    }

    focus(){
        this.customIO.focus();
    }

    activate(){
        this.customIO.open(document.getElementById('customIO'));
        this.adjustWindowSize();
        this.customIO.focus();
    }

    adjustWindowSize(){
        if (!this.customIO) {
            return;
        }

        this.customIO.element.style.padding = '5px';
        
        setTimeout(() => {
        this.fitAddon.fit();
        }, 0);

        const elemDim = getComputedStyle(document.getElementById('customIO'));
        const customIODim = getComputedStyle(this.customIO.element);

        const elemHeight = parseInt(elemDim.height, 10);
        const customIOHeight = parseInt(customIODim.height, 10);

        const newPadding = elemHeight - customIOHeight + 5;

        if (isNaN(newPadding)) {

            setTimeout(() => {
                this.fitAddon.fit();
                }, 0);

            this.customIO.element.style.paddingBottom = `${newPadding}px`;
        }
    }

    destroy(){
        if(this.customIO) this.customIO.dispose();
    }



}