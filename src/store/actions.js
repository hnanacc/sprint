import CodeFile from '@/utils/CodeFile';

import fs from 'fs';
import path from 'path';

const { dialog, clipboard } = require('electron').remote;

export default {

    newCodeFile({ commit, dispatch, state }) {

        commit('start', 'Select file path in dialog');

        const targetPath = dialog.showSaveDialogSync();

        if (targetPath === undefined) {
            dispatch('notify', {
                type: 'warning',
                msg: 'Create code operation cancelled !'
            })
            commit('stop');
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
        commit('stop');
        dispatch('notify', {
            type: 'success',
            msg: 'File created successfully !'
        })
    },

    openCodeFiles({ commit, dispatch, state }) {

        commit('start', 'Select file paths in dialog');

        const targetPath = dialog.showOpenDialogSync({
            properties: ["openFile", "multiSelections"],
        });

        if (targetPath === undefined) {
            dispatch('notify', {
                type: 'warning',
                msg: 'Open file operation cancelled !'
            })
            commit('stop');
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
        commit('stop');
        dispatch('notify', {
            type: 'success',
            msg: 'Files opened successfully !'
        });

    },

    runCode({ state, commit, dispatch }) {

        commit('start', 'Running active code');

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

            dispatch('notify', {
                type: 'success',
                msg: 'Running active code file in custom mode.'
            })


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
                dispatch('notify', {
                    type: 'error',
                    msg: err
                })
                alert(err);
            })

            commit('stop');

        } else {

            commit('start', 'Running active code');

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

                    dispatch('notify', {
                        type: 'error',
                        msg: `Some testcases failed to run !`
                    })
                }

            }
            commit('stop');
        }
    },

    compileRunCode({ commit, dispatch, state }) {

        commit('start', 'Compiling active code');

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

            dispatch('notify', {
                type: 'success',
                msg: 'Code compiled successfully !'
            })


        } else {

            dispatch('notify', {
                type: 'error',
                msg: compile_out.stderr
            })
        }

        commit('stop');

    },

    saveCodeFile({ state, commit, dispatch }) {
        commit('start', 'Saving active code');
        state.activeCodeFile.saveFile();
        dispatch('notify', {
            type: 'success',
            msg: 'File saved successfully!'
        })
        commit('stop');
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

    copyToClipboard({ state, commit, dispatch }) {

        commit('start', 'Copying active code');

        if (state.activeCodeFile === null) {
            commit('stop');
            alert('Editor is empty. Open a file first !');
            return;
        }

        clipboard.writeText(state.editor.getValue());
        commit('stop');
        dispatch('notify', {
            type: 'info',
            msg: 'File copied to clipboard!'
        })
    },

    saveTestCases({ state, commit, dispatch }) {

        commit('start', 'Saving test cases');

        if (state.activeCodeFile === null) {
            alert('No file Selected. Select one first!');
            commit('stop');
            return;
        }

        if (state.activeCodeFile.getTestCases().length < 1) {
            alert('No test cases added. Add one first !');
            commit('stop');
            return;
        }

        const testcases = state.activeCodeFile.getTestCases();

        const targetPath = dialog.showOpenDialogSync({
            properties: ['createDirectory', 'openDirectory']
        });

        if (targetPath === undefined) {
            dispatch('notify', {
                type: 'warning',
                msg: 'Save test cases operation cancelled !'
            })
            commit('stop')
            return;
        }

        for (let idx in testcases) {

            commit('start', `Writing test case ${idx + 1}`);

            fs.writeFileSync(path.resolve(targetPath[0], `testcase${idx}.in`), testcases[idx].input);
            fs.writeFileSync(path.resolve(targetPath[0], `testcase${idx}.out`), testcases[idx].expected);
        }

        dispatch('notify', {
            type: 'success',
            msg: 'Saved all test cases successfully !'
        })

        commit('stop');

    },

    loadTestCases({ state, commit, dispatch }) {

        commit('start', 'Loading test cases');

        if (state.activeCodeFile === null) {
            alert('No file selected. Select one first !');
            commit('stop');
            return;
        }

        const targetPath = dialog.showOpenDialogSync({
            properties: ['openDirectory']
        });

        if (targetPath === undefined) {
            dispatch('notify', {
                type: 'warning',
                msg: 'Load testcases operation cancelled !'
            })
            commit('stop');
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

        commit('stop');
        dispatch('notify', {
            type: 'success',
            msg: 'All test cases loaded successfully !'
        })

    },

    notify({state}, ev){
        state.notifier.notify(ev);
    },





}