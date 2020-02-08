
import path from 'path';
import fs from 'fs';

import TestCase from '@/utils/TestCase';

export default class CodeFile {

    constructor(model, pathaddr, lang, exe_addr, testcases=[]) {

        this.text = path.basename(pathaddr);
        this.value = this.text;
        this.model = model;
        this.path = pathaddr;
        this.exe_addr = exe_addr;
        this.testcases = testcases;
        this.lang = lang;
    }

    addTestCase(inputData, expectedData) {

        let testCaseObj = new TestCase(
            inputData,
            expectedData
        );

        this.testcases.push(testCaseObj);
    }

    removeTestCase(idx){

        this.testcases.splice(idx, 1);
    }

    getTestCases(){
        return this.testcases;
    }

    saveFile() {

        // Get the value of current model.
        const data = this.model.getValue();

        // Write the model value to the file.
        fs.writeFileSync(this.path, data);
    }
}