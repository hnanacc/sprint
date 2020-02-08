
import * as monaco from 'monaco-editor';
import fs from 'fs';

export default class Editor {

    constructor() {

        this._editor = null;
        this._diff = null;
    }

    initCodeEditor() {

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

    initDiff() {
        this._diff = monaco.editor.createDiffEditor(document.getElementById("diffEditor"));
    }

    newDiff(actual, expected) {

        const actualModel = monaco.editor.createModel(actual);
        const expectedModel = monaco.editor.createModel(expected);

        this._diff.setModel({
            original: actualModel,
            modified: expectedModel
        })
    }

    closeDiff() {
        
    }


    newModel(path) {

        if (!fs.existsSync(path)) {
            const content = `/*\n* Author: bitbeast18\n* Created On: ${new Date().toLocaleString()}\n*/`
            fs.writeFileSync(path, content);
        }

        const data = fs.readFileSync(path, 'utf-8');

        let lang = null;

        if (path.endsWith('cpp')) {
            lang = 'cpp';
        } else if (path.endsWith('py')) {
            lang = 'python';
        } else if (path.endsWith('java')) {
            lang = 'java';
        } else {
            lang = 'c';
        }

        const model = monaco.editor.createModel(data, lang);

        this._editor.setModel(model);

        return { model, lang };
    }

    setModel(model) {
        this._editor.setModel(model);
    }

    getValue(){
        return this._editor.getValue();
    }
}

