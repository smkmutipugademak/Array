// Output handler untuk Skulpt
function outf(text) {
    const outputArea = document.getElementById("output");
    outputArea.innerHTML += text + "\n";
}

// Loader untuk Python standard library
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Tombol Jalankan
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

// Sistem Tab Navigasi
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((t) => t.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});
