let currentLevel = 1;

const lessons = {
    1: {
        guide: "💡 **Dasar List**\nList adalah kumpulan data dalam satu variabel. Coba buat list dan cetak isinya.",
        code: `# Level 1: Membuat list sederhana
buah = ["apel", "pisang", "jeruk"]
print(buah)`,
        explain: "List ditulis menggunakan tanda kurung siku []. Di atas kita membuat list berisi 3 elemen string."
    },
    2: {
        guide: "📚 **Akses Elemen List**\nGunakan indeks (mulai dari 0) untuk mengambil elemen tertentu.",
        code: `buah = ["apel","pisang","jeruk"]
print(buah[0])  # cetak elemen pertama`,
        explain: "Indeks pertama selalu 0. Jadi buah[0] adalah 'apel'."
    }
};

// ========== FUNGSI LEVEL ==========
function loadLevel(n) {
    currentLevel = n;
    document.querySelectorAll(".level").forEach((el, i) => {
        el.classList.toggle("active", i + 1 === n);
    });
    document.getElementById("guide").textContent = lessons[n]?.guide || "Level belum dibuat.";
    document.getElementById("editor").value = lessons[n]?.code || "";
    document.getElementById("output").textContent = "Output akan tampil di sini...";
    document.getElementById("progress").textContent = `Level ${n} dari 10`;
}

function nextLevel() {
    if (currentLevel < 10) loadLevel(currentLevel + 1);
}

function showExplain() {
    document.getElementById("output").textContent =
        lessons[currentLevel]?.explain || "Belum ada penjelasan.";
}

// ========== SKULPT (PYTHON DI BROWSER) ==========
function outf(text) {
    document.getElementById("output").textContent += text;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function runCode() {
    const code = document.getElementById("editor").value;
    document.getElementById("output").textContent = "";
    Sk.configure({ output: outf, read: builtinRead });
    Sk.misceval.asyncToPromise(() =>
        Sk.importMainWithBody("<stdin>", false, code, true)
    ).catch(err => {
        document.getElementById("output").textContent = err.toString();
    });
}

window.onload = () => loadLevel(1);
