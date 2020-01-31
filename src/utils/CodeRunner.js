import os from 'os';
import path from 'path';
import fs from 'fs';
import {spawnSync} from 'child_process';

class CodeRunner {

    constructor(){
        this.tempdir = path.resolve(os.tmpdir(), 'sprint_fs');

        this.cdir = path.resolve(this.tempdir, 'c');
        this.cppdir = path.resolve(this.tempdir, 'cpp');
        this.javadir = path.resolve(this.tempdir, 'java');
        
        if(!fs.existsSync(this.tempdir)){
            fs.mkdirSync(this.tempdir);
        }

        if(!fs.existsSync(this.cdir)){
            fs.mkdirSync(this.cdir);
        }
        if(!fs.existsSync(this.cppdir)){
            fs.mkdirSync(this.cppdir);
        }
        if(!fs.existsSync(this.javadir)){
            fs.mkdirSync(this.javadir);
        }
       
    }

    // compile code methods.

    compileC(addr){
        const c_source = path.resolve(this.cdir, path.basename(addr, '.c'));
        console.log(c_source);
        const compiler_out = spawnSync('gcc', [addr, '-o', c_source], {
            encoding: 'utf-8',
            windowsHide: true
        });

        compiler_out.c_source = c_source;
        return compiler_out;
    }

    compileCPP(addr){

        const c_source = path.resolve(this.cppdir, path.basename(addr, '.cpp'));
        console.log(c_source);
        const compiler_out = spawnSync('g++', [addr, '-o', c_source], {
            encoding: 'utf-8',
            windowsHide: true
        });

        compiler_out.c_source = c_source;
        return compiler_out;
    }

    compileJAVA(addr){
        const c_source = path.resolve(this.javadir, path.basename(addr, '.java'));
        if(!fs.existsSync(c_source)){
            fs.mkdirSync(c_source);
        }
        console.log(c_source);
        const compiler_out = spawnSync('javac', ['-d', c_source, addr], {
            encoding: 'utf-8',
            windowsHide: true
        });

        compiler_out.c_source = c_source;
        return compiler_out;
    }

    // run code methods.

    runC(testcase, addr){

        const runner_out = spawnSync(addr, {
            input: testcase,
            encoding: 'utf-8',
            windowsHide: true
        })

        return runner_out;
    }

    runCPP(testcase, addr){

        const runner_out = spawnSync(addr, {
            input: testcase,
            encoding: 'utf-8',
            windowsHide: true
        })

        return runner_out;
    }

    runJAVA(testcase, addr){

        let class_name = null;

        if(fs.existsSync(path.resolve(addr, path.basename(addr) + '.class'))){
            // If class with main is public...
            class_name = path.basename(addr);

        } else {
            // If class with main is not public...
            class_name = 'Solution';
        }

        const runner_out = spawnSync('java', ['-cp', addr, class_name], {
            input: testcase,
            encoding: 'utf-8'
        });

        return runner_out;
    }

    runPY(testcase, addr){

        const interpreter_out = spawnSync('python3', [addr], {
            input: testcase,
            encoding: 'utf-8',
            windowsHide: true
        });

        return interpreter_out;
    }
}

export default new CodeRunner();