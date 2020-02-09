export default {
    isLeftDock: false,
    isTopStatusBar: false,
    isDarkTheme: true,
    customInputMode: true,

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
    status: 'Sprint Editor v0.1.0',
    processRunning: false,

    // Dialog boxes.
    addTestCaseDialogState: false,
    showTestCaseDialogState: false,
}