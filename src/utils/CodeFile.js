

export default class CodeFile {
    
    constructor(model, path, lang){

        const arr = path.split('/');

        this.text = arr[arr.length - 1];
        this.value = this.text;
        this.model = model;
        this.path = path;
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