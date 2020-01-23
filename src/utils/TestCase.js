/* 
    Class that represents a testcase.
    Constains the file location as 'testFile' and the
    status of the testCase [default | Accepted | Error | Wrong] 

*/

export default class TestCase {

    constructor(testFile){
        this.testFile = testFile;
        this.status = 'default';
    }

}