import path from 'path';

export default class CodeFile {
    
    constructor(model, pathaddr, lang){

        this.text = path.basename(pathaddr);
        this.value = this.text;
        this.model = model;
        this.path = pathaddr;
        this.testcases = [];
        this.lang = lang;
    }

    addTestCase(testCaseObj){
        this.testcases.push(testCaseObj);
        console.log('test cases added to' + testCaseObj);
    }

    runCode(){
        console.log('Running code...');
    }

    compileRunCode(){
        console.log('Compiling and running code...');
    }
}