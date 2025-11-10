function outf(text) {
    const outputArea = document.getElementById("output");
    outputArea.innerHTML += text + "\n";
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

document.getElementById("runBtn").addEventListener("click", () => {
    const prog = document.getElementById("editor").value;
    const outputArea = document.getElementById("output");
    outputArea.innerHTML = "";

    Sk.configure({ output: outf, read: builtinRead });
    const promise = Sk.misceval.asyncToPromise(() =>
        Sk.importMainWithBody("<stdin>", false, prog, true)
    );

    promise.then(
        () => outf("\n✅ Program selesai tanpa error."),
        (err) => outf("\n❌ Error: " + err.toString())
    );
});
