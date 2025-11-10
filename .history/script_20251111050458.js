// Output handler
function outf(text) {
    const output = document.getElementById("output");
    output.innerHTML += text + "\n";
}

// Loader untuk Python stdlib
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Jalankan program
document.getElementById("runBtn").addEventListener("click", () => {
    const code = document.getElementById("editor").value;
    const output = document.getElementById("output");
    output.innerHTML = "";
    Sk.configure({ output: outf, read: builtinRead });
    Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
        .then(() => outf("\n✅ Program selesai tanpa error."))
        .catch((err) => outf("\n❌ Error: " + err.toString()));
});

// Tab navigasi
document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});
