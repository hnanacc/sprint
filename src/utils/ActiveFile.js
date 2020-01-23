/* 
    Class ActiveFile represents the current active file in 
    the editor. 

    Fields 
        - editorInstance : The moanaco editor model.
        - dirAddr: The directory address of the file.
        - testCases : An array consisting of filepaths of test cases.

*/

export default class ActiveFile {

    constructor(editorInstance, dirAddr){
        this.editorInstance = editorInstance;
        this.dirAddr = dirAddr;
        this.testCases = []; 
    }
}