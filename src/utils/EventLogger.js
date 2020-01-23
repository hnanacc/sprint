
/* 
    Class EventLogger represents a Event Logger that logs all
    the events occuring in the system.

    Fields
        - el : The DOM element on where the messages will be visible. (textarea)

    Methods
        - logMessage(msg, type) : A method that logs the message to the text area.
            - msg : The message to display.
            - type : The type of message [error | build | event].

*/

export default class EventLogger {

    constructor(el){
        this.el = el
    }

    logMessage(msg, type){
        console.log(msg, type);
    }
}