import Editor from '@/utils/Editor';
import CodeRunner from '@/utils/CodeRunner';
import Notifier from '@/utils/Notifier';
import Console from '@/utils/Console';
import CustomIO from '@/utils/CustomIO';

import fs from 'fs';
import path from 'path';
import os from 'os';

export default {

    // Initialisations.

    initStore(state) {

        // Independent of DOM.

        state.notifier = new Notifier();
        state.runner = new CodeRunner();
        state.editor = new Editor();

        // Init filesystem.

        state.tempdir = path.resolve(os.tmpdir(), 'sprint_fs');

        // Directory for C executables. $TEMP/c/
        state.cdir = path.resolve(state.tempdir, 'c');

        // Directory for C++ executables. $TEMP/cpp/
        state.cppdir = path.resolve(state.tempdir, 'cpp');

        // Directory for JAVA bytecodes. Every CodeFile has 
        // its own directory containing .class files.
        state.javadir = path.resolve(state.tempdir, 'java');

        // Check if it already exists from previous execution.

        if (!fs.existsSync(state.tempdir)) {
            fs.mkdirSync(state.tempdir);
        }

        // Check if it already exists from previous execution.

        if (!fs.existsSync(state.cdir)) {
            fs.mkdirSync(state.cdir);
        }

        // Check if it already exists from previous execution.

        if (!fs.existsSync(state.cppdir)) {
            fs.mkdirSync(state.cppdir);
        }

        // Check if it already exists from previous execution.

        if (!fs.existsSync(state.javadir)) {
            fs.mkdirSync(state.javadir);
        }
    },

    // DOM dependent

    initConsole(state) {
        // Preserves the previous state.
        if (!state.console) {
            state.console = new Console();
        }
        state.console.activate();
    },

    initDiffEditor(state) {

        state.editor.initDiff();
        state.editor.newDiff(state.curTestCase.value.stdout, state.curTestCase.value.expected);

    },

    initCodeEditor(state) {
        state.editor.initCodeEditor();
    },

    initCustomIO(state){
        if (!state.customIO) {
            state.customIO = new CustomIO();
        }
        state.customIO.activate();
    },

    // Code Manager

    addCodeFile(state, newCodeFile) {
        state.allCodeFiles.push(newCodeFile);
    },

    setCodeFile(state, targetCodeFile) {

        if (targetCodeFile === null){
            state.activeCodeFile = null;
            state.editor.setModel(null);
            return;
        }

        state.activeCodeFile = targetCodeFile;
        state.editor.setModel(targetCodeFile.model);
    },

    setObjDirectory(state, path) {
        state.activeCodeFile.exe_addr = path;
    },

    // Status bar

    start(state, msg){
        state.status = msg;
        state.processRunning = true; 
    },

    stop(state){
        state.status = 'Sprint Editor v0.1.0';
        state.processRunning = false;
    },

    // Dialog state management.

    changeAddTestCaseDialogState(state) {

        if(state.activeCodeFile === null){
            alert('No file selected. Select one first !');
            return;
        }

        state.addTestCaseDialogState = !state.addTestCaseDialogState;
    },

    changeShowTestCaseDialogState(state, idx) {


        if (idx === null) {
            state.editor.closeDiff();
        } else {

            state.curTestCase = {
                value: state.activeCodeFile.testcases[idx],
                idx: idx
            };

        }

        state.showTestCaseDialogState = !state.showTestCaseDialogState;

        if (state.editor._diff) {
            state.editor.newDiff(state.curTestCase.value.stdout, state.curTestCase.value.expected);
        }
    },

    changeCustomInputMode(state) {
        state.layout.customInputMode = !state.layout.customInputMode;
    },

    // Appearance

    setTheme(state, val){
        if(val === 'dark'){
            state.isDarkTheme = true;
        } else {
            state.isDarkTheme = false;
        }
    },

    setStatusBar(state, val){
        if(val === 'top'){
            state.isTopStatusBar = true;
        } else {
            state.isTopStatusBar = false;
        }
    },

    setDock(state, val){
        if(val === 'left'){
            state.isLeftDock = true;
        } else {
            state.isLeftDock = false;
        }
    }

}