function outf(text) {
    const output = document.getElementById("output");
    output.innerHTML += text + "\n";
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

document.getElementById("runBtn").addEventListener("click", () => {
    const lang = document.getElementById("language").value;
    const code = document.getElementById("editor").value;
    const output = document.getElementById("output");
    output.innerHTML = "";

    if (lang === "python") {
        Sk.configure({ output: outf, read: builtinRead });
        Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
            .then(() => outf("\n✅ Python selesai tanpa error"))
            .catch((err) => outf("❌ Python Error: " + err.toString()));
    }

    else if (lang === "javascript") {
        try {
            const result = eval(code);
            if (result !== undefined) outf(result);
            outf("\n✅ JavaScript selesai tanpa error");
        } catch (err) {
            outf("❌ JS Error: " + err);
        }
    }

    else if (lang === "kotlin") {
        outf("⚙️ Kotlin tidak dijalankan langsung di sini.\nGunakan playground JetBrains untuk menjalankan kode Kotlin.");
    }
});

// Ganti teori sesuai bahasa
document.getElementById("language").addEventListener("change", (e) => {
    document.querySelectorAll(".theory").forEach(t => t.classList.remove("active"));
    document.getElementById(`theory-${e.target.value}`).classList.add("active");

    // Update kode contoh di editor
    const editor = document.getElementById("editor");
    if (e.target.value === "python") {
        editor.value = `buah = ["apel", "pisang", "mangga"]\nprint("List awal:", buah)\nbuah.append("jeruk")\nprint("Setelah tambah:", buah)`;
    } else if (e.target.value === "javascript") {
        editor.value = `let buah = ["apel", "pisang", "mangga"];\nconsole.log("Array awal:", buah);\nbuah.push("jeruk");\nconsole.log("Setelah tambah:", buah);`;
    } else {
        editor.value = `val buah = mutableListOf("apel", "pisang", "mangga")\nprintln("List awal: $buah")\nbuah.add("jeruk")\nprintln("Setelah tambah: $buah")`;
    }
});

// Tabs
const tabs = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".tab-content");
tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
        tabs.forEach(b => b.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});
