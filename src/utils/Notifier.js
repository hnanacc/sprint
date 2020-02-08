

export default class Notifier {

    constructor(){
        this._eventQueue = [];
    }

    notify(event){

        if(this._eventQueue.length > 10){
            this.reset();
        }

        this._eventQueue.unshift(event); // O(1) i guess.
    }    

    reset(){

        // This works on all javascript versions. Don't doubt.
        this._eventQueue.length = 0;
    }

    renderQueue(){
        return this._eventQueue;
    }
}

