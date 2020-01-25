

export default class CodeFile {
    
    constructor(editorInstance, path){
        this.editorInstance = editorInstance;
        this.path = path;
        this.testcases = [];
        this.lang = "python";
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