export default {
    layout: {
        rightPanel: true,
        bottomToolBar: true,
        customInputMode: true,
    },

    // Instances.
    console: null,
    editor: null,
    runner: null,
    notifier: null,
    customIO: null,

    // File System.
    tempdir: null,
    cdir: null,
    cppdir: null,
    javadir: null,

    // Env.
    activeCodeFile: null,
    allCodeFiles: [],
    curTestCase: {
        value: null,
        idx: null
    },

    // Dialog boxes.
    addTestCaseDialogState: false,
    showTestCaseDialogState: false,
}