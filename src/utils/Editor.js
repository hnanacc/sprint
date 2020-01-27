
import * as monaco from 'monaco-editor';
import fs from 'fs';

export default class Editor {

    constructor() {
        this._editor = monaco.editor.create(
            document.getElementById("editor"),
            {
                theme: 'vs-dark',
                automaticLayout: true,
                model: null,
                minimap: {
                    enabled: false,
                }
            });

    }


    newFile(path) {
        var model;

        var data = fs.readFileSync(path, 'utf-8');

        var lang = 'cpp';

        if (path.endsWith('cpp')) {
            lang = 'cpp';
        } else if (path.endsWith('py')) {
            lang = 'python';
        } else {
            lang = 'java';
        }

        model = monaco.editor.createModel(data, lang);
        console.log(model);

        this._editor.setModel(model);

        return {model, lang};
    }

    changeModel(model){
        this._editor.setModel(model);
    }
}

