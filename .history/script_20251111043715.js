// Output handler untuk Skulpt
function outf(text) {
    const outputArea = document.getElementById("output");
    outputArea.innerHTML += text + "\n";
}

// Loader untuk library Python bawaan
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Jalankan kode Python
document.getElementById("runBtn").addEventListener("click", () => {
    const prog = document.getElementById("editor").value;
    const outputArea = document.getElementById("output");
    outputArea.innerHTML = ""; // Bersihkan output

    Sk.configure({ output: outf, read: builtinRead });
    const promise = Sk.misceval.asyncToPromise(() =>
        Sk.importMainWithBody("<stdin>", false, prog, true)
    );

    promise.then(
        () => outf("\n✅ Program selesai tanpa error."),
        (err) => outf("\n❌ Error: " + err.toString())
    );
});
