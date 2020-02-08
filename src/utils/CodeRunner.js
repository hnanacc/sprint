
import fs from 'fs';
import path from 'path';
import {spawnSync} from 'child_process';

export default class CodeRunner {

    constructor() {

        console.log('Runner initialising...');

        // TODO: Add checks for language specific compiler in PATH variable.

    }


    // Methods responsible for Compiling CodeFile source.

    compileC(addr, lang_dir) {
        const exe_addr = path.resolve(lang_dir, path.basename(addr, '.c'));

        const compiler_out = spawnSync('gcc', [addr, '-o', exe_addr], {
            encoding: 'utf-8',
            windowsHide: true
        });

        compiler_out.exe_addr = exe_addr;
        return compiler_out;
    }

    compileCPP(addr, lang_dir) {

        console.log(addr, lang_dir);

        const exe_addr = path.resolve(lang_dir, path.basename(addr, '.cpp'));

        const compiler_out = spawnSync('g++', [addr, '-o', exe_addr], {
            encoding: 'utf-8',
            windowsHide: true
        });

        compiler_out.exe_addr = exe_addr;
        return compiler_out;
    }

    compileJAVA(addr, lang_dir) {

        const exe_addr = path.resolve(lang_dir, path.basename(addr, '.java'));
        
        if (!fs.existsSync(exe_addr)) {
            fs.mkdirSync(exe_addr);
        }
        
        const compiler_out = spawnSync('javac', ['-d', exe_addr, addr], {
            encoding: 'utf-8',
            windowsHide: true
        });

        compiler_out.exe_addr = exe_addr;
        return compiler_out;
    }

    // Methods responsible for Running CodeFile source.

    runC(testcase, addr) {

        const runner_out = spawnSync(addr, {
            input: testcase.input,
            encoding: 'utf-8',
            windowsHide: true
        })

        return runner_out;
    }

    runCPP(testcase, addr) {

        const runner_out = spawnSync(addr, {
            input: testcase.input,
            encoding: 'utf-8',
            windowsHide: true
        })

        return runner_out;
    }

    runJAVA(testcase, addr) {

        let class_name = null;

        if (fs.existsSync(path.resolve(addr, path.basename(addr) + '.class'))) {
            // If class with main is public
            class_name = path.basename(addr);

        } else {
            // If class with main is not public
            class_name = 'Solution';
        }

        const runner_out = spawnSync('java', ['-cp', addr, class_name], {
            input: testcase.input,
            encoding: 'utf-8'
        });

        return runner_out;
    }

    runPY(testcase, addr) {

        const interpreter_out = spawnSync('python3', [addr], {
            input: testcase.input,
            encoding: 'utf-8',
            windowsHide: true
        });

        return interpreter_out;
    }

}