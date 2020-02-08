import CodeFile from '@/utils/CodeFile';

import fs from 'fs';
import path from 'path';

const { dialog, clipboard } = require('electron').remote;

export default {

    newCodeFile({ commit, state }) {

        const targetPath = dialog.showSaveDialogSync();

        if (targetPath === undefined) {
            return;
        }

        var newFileModel = state.editor.newModel(targetPath);

        const newCodeFile = new CodeFile(
            newFileModel.model,
            targetPath,
            newFileModel.lang
        );

        commit('addCodeFile', newCodeFile);
        commit('setCodeFile', newCodeFile);
    },

    openCodeFiles({ commit, state }) {

        const targetPath = dialog.showOpenDialogSync({
            properties: ["openFile", "multiSelections"],
        });

        if (targetPath === undefined) {
            return;
        }

        for (var item of targetPath) {
            const newFileModel = state.editor.newModel(item);

            const openCodeFile = new CodeFile(
                newFileModel.model,
                item,
                newFileModel.lang
            );

            commit('addCodeFile', openCodeFile);
        }

        commit('setCodeFile', state.allCodeFiles[state.allCodeFiles.length - 1]);

    },

    runCode({ state, dispatch }) {

        // Save file before running.
        state.activeCodeFile.saveFile();

        // Check if compiled executable exists.
        if (state.activeCodeFile.exe_addr === null || !fs.existsSync(state.activeCodeFile.exe_addr)) {
            dispatch('compileRunCode');
        }

        if (state.layout.customInputMode) {

            let avail = true;

            state.customIO.clear();
            state.customIO.focus();
            let subProcess = state.runner.launchRunProcess(state.activeCodeFile);

            let view = state.customIO.getCustomIO();


            view.onKey((e) => {

                if (avail) {

                    const ev = e.domEvent;
                    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

                    if (ev.keyCode === 13) {
                        view.write('\r\n');
                        subProcess.stdin.write(e.key);
                    } else if (ev.keyCode === 8) {
                        // Do not delete the prompt
                        if (this.customIO._core.buffer.x > 2) {
                            view.write('\b \b');
                        }
                    } else if (printable) {
                        view.write(e.key);
                        subProcess.stdin.write(e.key);
                    }
                }
            });

            subProcess.stdout.on('data', (data) => {
                view.write('\r\n');
                view.write(data);
                view.write('\r\n');
            })

            subProcess.on('close', (code) => {
                view.write(`Process exited with exit code ${code}.`);
                view = null;
                avail = false;
            })

            subProcess.on('error', (err) => {
                alert(err);
            })

        } else {

            // The output of code running process.
            let run_out = null;

            // Go through all testcases one by one.
            for (let test of state.activeCodeFile.testcases) {

                // Run code is different for all languages. Select one.
                if (state.activeCodeFile.lang === 'c') {
                    run_out = state.runner.runC(test, state.activeCodeFile.exe_addr);

                } else if (state.activeCodeFile.lang === 'cpp') {
                    run_out = state.runner.runCPP(test, state.activeCodeFile.exe_addr);

                } else if (state.activeCodeFile.lang === 'java') {
                    run_out = state.runner.runJAVA(test, state.activeCodeFile.exe_addr);

                } else {
                    run_out = state.runner.runPY(test, state.activeCodeFile.exe_addr);
                }


                // Check if testcase ran successfully.
                if (run_out.status === 0) {

                    // Testcase ran successfully.
                    test.stdout = run_out.stdout.trim();
                    test.stderr = run_out.stderr.trim();

                    test.status = test.stdout === test.expected
                        ? 'success'
                        : 'error';

                } else {

                    // An error occured while running testcase.
                    test.status = 'warning';
                    test.stderr = run_out.stderr.trim();
                }
            }

        }
    },

    compileRunCode({ commit, dispatch, state }) {

        // Save file before compiling.
        state.activeCodeFile.saveFile();

        // The output of code compiling process.
        let compile_out = null;

        // Compile code is different for all languages. Select one.
        if (state.activeCodeFile.lang === 'c') {
            compile_out = state.runner.compileC(state.activeCodeFile.path, state.cdir);

        } else if (state.activeCodeFile.lang === 'cpp') {
            compile_out = state.runner.compileCPP(state.activeCodeFile.path, state.cppdir);

        } else if (state.activeCodeFile.lang === 'java') {
            compile_out = state.runner.compileJAVA(state.activeCodeFile.path, state.javadir);

        } else {
            // There is no compilation in python. Hence use dummy obj.
            // Maybe a check can be added for syntactic correctness.
            compile_out = {
                status: 0,
                exe_addr: state.activeCodeFile.path
            }
        }

        // Check if code compiled successfully.
        if (compile_out.status === 0) {

            // Code compiled successfully.
            commit('setObjDirectory', compile_out.exe_addr);
            dispatch('runCode');


        } else {

            // Some error occured.
        }

    },

    saveCodeFile({ state }) {
        state.activeCodeFile.saveFile();
    },

    closeCodeFile({ commit, state }) {
        const idx = state.allCodeFiles.indexOf(state.activeCodeFile);
        state.allCodeFiles.splice(idx, 1);

        if (state.allCodeFiles.length > 0) {
            commit('setCodeFile', state.allCodeFiles[0]);
        } else {
            commit('setCodeFile', null);
        }
    },

    copyToClipboard({ state }) {

        if (state.activeCodeFile === null) {
            alert('Editor is empty. Open a file first !');
            return;
        }

        clipboard.writeText(state.editor.getValue());
    },

    saveTestCases({ state }) {

        if (state.activeCodeFile === null) {
            alert('No file Selected. Select one first!');
            return;
        }

        if (state.activeCodeFile.getTestCases().length < 1) {
            alert('No test cases added. Add one first !');
            return;
        }

        const testcases = state.activeCodeFile.getTestCases();

        const targetPath = dialog.showOpenDialogSync({
            properties: ['createDirectory', 'openDirectory']
        });

        if (targetPath === undefined) {
            return;
        }

        for (let idx in testcases) {

            fs.writeFileSync(path.resolve(targetPath[0], `testcase${idx}.in`), testcases[idx].input);
            fs.writeFileSync(path.resolve(targetPath[0], `testcase${idx}.out`), testcases[idx].expected);
        }

    },

    loadTestCases({ state }) {

        if (state.activeCodeFile === null) {
            alert('No file selected. Select one first !');
            return;
        }

        const targetPath = dialog.showOpenDialogSync({
            properties: ['openDirectory']
        });

        if (targetPath === undefined) {
            return;
        }

        const files = fs.readdirSync(targetPath[0]);

        for (let file of files) {

            if (file.endsWith('.in')) {

                state.activeCodeFile.addTestCase(
                    fs.readFileSync(path.resolve(targetPath[0], file), {
                        encoding: 'utf-8'
                    }),
                    fs.readFileSync(path.resolve(targetPath[0], file.slice(0, -3) + '.out'), {
                        encoding: 'utf-8'
                    })
                )

            }
        }

    }





}