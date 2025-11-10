// ============================================================
// 🧠 PYTHON COMPILER WITH AUTOSAVE
// ============================================================

const defaultCode = `# 📘 PRAKTIKUM PYTHON LIST LENGKAP
buah = ["apel", "jeruk", "pisang", "mangga"]
print("List buah awal:", buah)
`;

const editor = document.getElementById("editor");
const output = document.getElementById("output");
const savedCode = localStorage.getItem("pythonCode");
editor.value = savedCode || defaultCode;

// Jalankan
function outf(text) {
  output.innerHTML += text + "\n";
}
function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}
document.getElementById("runBtn").addEventListener("click", () => {
  output.innerHTML = "";
  Sk.configure({ output: outf, read: builtinRead });
  Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, editor.value, true))
    .then(() => outf("\n✅ Program selesai tanpa error."))
    .catch(err => outf("\n❌ Error: " + err.toString()));
});

// Reset
document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("Yakin ingin mengembalikan kode ke versi awal?")) {
    editor.value = defaultCode;
    output.innerHTML = "";
    localStorage.removeItem("pythonCode");
  }
});

// Autosave
setInterval(() => localStorage.setItem("pythonCode", editor.value), 2000);

// ===========================
//  Tab Navigasi (Fix Bug)
// ===========================
document.querySelectorAll(".tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});
