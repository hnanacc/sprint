

export default class CodeFile {
    
    constructor(editorInstance, path){
        this.editorInstance = editorInstance;
        this.path = path;
        this.testcases = [];
    }

    addTestCase(testId){
        this.testcases.push(testId);
        console.log('test cases added to' + testId);
    }

    runCode(){
        console.log('Running code...');
    }
}