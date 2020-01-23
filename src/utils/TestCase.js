/* 
    Class that represents a testcase.
    
    Fields
        - fileAddr : Address of the file in file system.
        - status : The run status of each test case. [default | Accepted | Error | Wrong] 
    
*/

export default class TestCase {

    constructor(testFile){
        this.testFile = testFile;
        this.status = 'default';
    }

}