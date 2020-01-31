import path from 'path';
import fs from 'fs';
import codeRunner from '@/utils/CodeRunner';

export default class CodeFile {

    constructor(model, pathaddr, lang) {

        this.text = path.basename(pathaddr);
        this.value = this.text;
        this.model = model;
        this.path = pathaddr;
        this.c_source = null;
        this.testcases = [];
        this.lang = lang;
    }

    addTestCase(testCaseObj) {
        this.testcases.push(testCaseObj);
        console.log('test cases added to' + testCaseObj);
    }

    runCode() {

        // Save file before running.
        this.saveFile();

        // Check if compiled executable exists.
        if (this.c_source === null || !fs.existsSync(this.c_source)){
            this.compileRunCode();
        }

        // The output of code running process.
        let run_out = null;

        // Go through all testcases one by one.
        for(let test of this.testcases){

            // Run code is different for all languages. Select one.
            if (this.lang === 'c') {    
                run_out = codeRunner.runC(test, this.c_source);

            } else if (this.lang === 'cpp') {
                run_out = codeRunner.runCPP(test, this.c_source);
                
            } else if (this.lang === 'java') {
                run_out = codeRunner.runJAVA(test, this.c_source);
                
            } else {
                run_out = codeRunner.runPY(test, this.c_source); 
            }


            // Check if testcase ran successfully.
            if (run_out.status === 0) {

                // Testcase ran successfully.
                this.test.stdout = run_out.stdout;
                this.test.stderr = run_out.stderr;
                this.test.status = this.test.output === this.test.expected
                                     ? 'accepted' 
                                     : 'wrong';

            } else {
                
                // An error occured while running testcase.
                this.test.status = 'error';
                this.test.stderr = run_out.stderr;
            }
        }
    }

    compileRunCode() {

        // Save file before compiling.
        this.saveFile();

        // The output of code compiling process.
        let compile_out = null;
        
        // Compile code is different for all languages. Select one.
        if (this.lang === 'c'){
            compile_out = codeRunner.compileC(this.path);

        } else if (this.lang === 'cpp'){
            compile_out = codeRunner.compileCPP(this.path);

        } else if (this.lang === 'java'){
            compile_out = codeRunner.compileJAVA(this.path);

        } else {
            // There is no compilation in python. Hence use dummy obj.
            // Maybe a check can be added for syntactic correctness.
            compile_out = {
                status: 0,
                c_source: this.path
            }
        }

        // Check if code compiled successfully.
        if (compile_out.status === 0){

            // Code compiled successfully.
            this.c_source = compile_out.c_source;
            this.runCode();

            return {
                type: 'success',
                msg: null
            }

        } else {

            // Some error occured.
            return {
                type: 'error',
                msg: compile_out.stderr
            }
        }

    }

    saveFile() {

        // Get the value of current model.
        const data = this.model.getValue();

        // Write the model value to the file.
        fs.writeFileSync(this.path, data);
    }
}