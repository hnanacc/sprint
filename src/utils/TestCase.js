/* 
    Class that represents a testcase.
    
    Fields
        - fileAddr : Address of the file in file system.
        - status : The run status of each test case. [default | Accepted | Error | Wrong] 
    
*/

export default class TestCase {

    constructor(inputData, expectedData){
        this.input = inputData;
        this.expected = expectedData;
        this.stdout = null;
        this.stderr = null;
        this.status = 'default';
    }

}