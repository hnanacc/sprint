import path from 'path';
import fs from 'fs';
import codeRunner from '@/utils/CodeRunner';

export default class CodeFile {

    constructor(model, pathaddr, lang) {

        this.text = path.basename(pathaddr);
        this.value = this.text;
        this.model = model;
        this.path = pathaddr;
        this.testcases = [];
        this.lang = lang;
    }

    addTestCase(testCaseObj) {
        this.testcases.push(testCaseObj);
        console.log('test cases added to' + testCaseObj);
    }

    runCode() {

        this.saveFile();

        if (this.lang === 'c') {
            return codeRunner.runC(this.path);

        } else if (this.lang === 'cpp') {
            return codeRunner.runCPP(this.path);

        } else if (this.lang === 'java') {
            return codeRunner.runJAVA(this.path);

        } else {
            return codeRunner.runPY(this.path);
        }
    }

    compileRunCode() {

        this.saveFile();

        if (this.lang === 'c') {
            const compile_out = codeRunner.compileC(this.path);

            if (compile_out.status === 0) {

                // successful compilation.

                for (var test of this.testcases) {
                    let run_out = codeRunner.runC(test, compile_out.c_source);

                    if (run_out.status === 0) {
                        // Ran successfully.
                    } else {
                        // error occurred.
                    }
                }

                return {
                    type: 'info',
                    msg: 'Ran all tests successfully!'
                }

            } else {
                // error occured.

                return {
                    type: 'error',
                    msg: compile_out.stderr
                }

            }

        } else if (this.lang === 'cpp') {

            const compile_out = codeRunner.compileCPP(this.path);

            if (compile_out.status === 0) {

                // successful compilation.

                for (let test of this.testcases) {
                    let run_out = codeRunner.runCPP(test, compile_out.c_source);

                    if (run_out.status === 0) {
                        // Ran successfully.
                    } else {
                        // error occurred.
                    }
                }

                return {
                    type: 'info',
                    msg: 'Ran all tests successfully!'
                }

            } else {
                // error occured.

                return {
                    type: 'error',
                    msg: compile_out.stderr
                }

            }

        } else if (this.lang === 'java') {

            const compile_out = codeRunner.compileJAVA(this.path);

            if (compile_out.status === 0) {

                // successful compilation.

                for (let test of this.testcases) {
                    let run_out = codeRunner.runJAVA(test, compile_out.c_source);

                    if (run_out.status === 0) {
                        // Ran successfully.
                    } else {
                        // error occurred.
                    }
                }

                return {
                    type: 'info',
                    msg: 'Ran all tests successfully!'
                }

            } else {
                // error occured.

                return {
                    type: 'error',
                    msg: compile_out.stderr
                }

            }

        } else if (this.lang === 'python') {

            for (let test of this.testcases) {
                
                let run_out = codeRunner.runPY(test, this.path);

                if (run_out.status === 0) {
                    // Ran successfully.
                    test.output = run_out.stdout;
                    test.status = run_out.output === run_out.expected ? 'success' : 'error';

                } else {
                    // error occurred.

                    return {
                        type: 'error',
                        msg: run_out.stderr
                    }
                }
            }

            return {
                type: 'info',
                msg: 'Ran all tests successfully!'
            }

        }

    }

    saveFile() {
        const data = this.model.getValue();
        fs.writeFileSync(this.path, data);
    }
}