import os from 'os';
import path from 'path';
import fs from 'fs';

export default class CodeRunner {

    constructor(){
        var tempdir = path.join([os.tmpdir(), 'sprint_filesystem']);
        
        if(!fs.existsSync(tempdir)){
            fs.mkdirSync(tempdir);
        }
    }

    compileC(){
        console.log('compile c...');
    }

    compileCPP(){

    }

    compileJAVA(){


    }

    runC(){
        console.log('c code running...');
    }

    runCPP(){
        console.log('c++ code running...');
    }

    runJAVA(){
        console.log('Java code running...');
    }

    runPY(){
        console.log('Python code running...');

    }
}