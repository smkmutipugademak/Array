const defaultCode = `# ============================================================
# 📘 PRAKTIKUM PYTHON LIST LENGKAP
# ============================================================

buah = ["apel", "jeruk", "pisang", "mangga"]
print("List buah awal:", buah)

# 🔹 Akses elemen
print("Buah pertama:", buah[0])
print("Buah terakhir:", buah[-1])

# 🔹 Ubah elemen
buah[0] = "apel hijau"
print("Setelah diubah:", buah)

# 🔹 Tambah data
buah.append("melon")
buah.insert(2, "anggur")
buah.extend(["nanas", "pepaya"])
print("Setelah ditambah:", buah)

# 🔹 Hapus data
buah.remove("jeruk")
hapus = buah.pop()
print("Setelah dihapus:", buah)
print("Yang dihapus:", hapus)

# 🔹 Fungsi dasar list
angka = [2, 4, 5, 5, 10, 4]
print("List angka:", angka)
print("Jumlah elemen:", len(angka))
print("Banyak angka 5:", angka.count(5))
print("Indeks angka 4:", angka.index(4))

# 🔹 Operasi list
print("Penjumlahan list:", angka + [20, 30])
print("Duplikasi list:", angka * 2)
print("Apakah 4 ada di list?", 4 in angka)

# 🔹 Slicing
print("Elemen ke-2 s.d 4:", angka[1:4])
print("Membalik urutan:", angka[::-1])

# 🔹 Nested list
kelas = [["Ani", 80], ["Budi", 90], ["Citra", 85]]
print("Nilai Budi:", kelas[1][1])

# 🔹 Looping
print("Daftar nilai siswa:")
for nama, nilai in kelas:
    print("-", nama, "=", nilai)

# 🔹 List comprehension
kuadrat = [x**2 for x in range(1, 6)]
print("Kuadrat 1–5:", kuadrat)

# 🔹 Sort & Reverse
angka2 = [9, 3, 6, 1, 7]
angka2.sort()
print("Urut naik:", angka2)
angka2.reverse()
print("Urut turun:", angka2)

# 🔹 Copy dan Clear
salinan = angka2.copy()
salinan.append(100)
print("Asli:", angka2)
print("Salinan:", salinan)
salinan.clear()
print("Setelah clear:", salinan)

print("\\n✅ Semua fungsi List Python telah dipelajari!")`;

// ===========================
//  Inisialisasi Editor
// ===========================
const editor = document.getElementById("editor");
// ===========================
// Highlight.js - Real-time syntax coloring
// ===========================
const highlighted = document.getElementById("highlightedCode");

function updateHighlight() {
    highlighted.innerHTML = editor.value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;"); // escape html
    hljs.highlightElement(highlighted);
}

// Event listener: update saat mengetik
editor.addEventListener("input", () => {
    updateHighlight();
    localStorage.setItem("pythonCode", editor.value);
});

// Sinkronkan scroll
editor.addEventListener("scroll", () => {
    highlighted.scrollTop = editor.scrollTop;
    highlighted.scrollLeft = editor.scrollLeft;
});


const output = document.getElementById("output");
const savedCode = localStorage.getItem("pythonCode");

editor.value = savedCode || defaultCode;
// Inisialisasi awal
updateHighlight();

// ===========================
//  Jalankan Program
// ===========================
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

// ===========================
//  Reset ke Default
// ===========================
document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Yakin ingin mengembalikan kode ke versi awal?")) {
        editor.value = defaultCode;
        output.innerHTML = "";
        localStorage.removeItem("pythonCode");
    }
});

// ===========================
//  Autosave Tiap 2 Detik
// ===========================
setInterval(() => {
    localStorage.setItem("pythonCode", editor.value);
}, 2000);

// ===========================
//  Tab Navigasi
// ===========================
document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});
// ===========================
//  Pengaturan Ukuran Teks
// ===========================
const fontSizeSelect = document.getElementById("fontSize");
const savedFontSize = localStorage.getItem("editorFontSize") || "15";
editor.style.fontSize = savedFontSize + "px";
fontSizeSelect.value = savedFontSize;

// Ganti ukuran teks dinamis
fontSizeSelect.addEventListener("change", () => {
    const newSize = fontSizeSelect.value;
    editor.style.fontSize = newSize + "px";
    localStorage.setItem("editorFontSize", newSize);
});


// ===============================
// 🧱 Anti Inspect Super Ketat
// ===============================
(function protectPage() {
    // 1️⃣ Deteksi devtools aktif (lebar window mencurigakan)
    let devtoolsOpen = false;
    const threshold = 160;

    function detectDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                document.body.innerHTML = `
                    <div style="
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        height:100vh;
                        background:#0f172a;
                        color:#e2e8f0;
                        font-family:'Fira Code', monospace;
                        text-align:center;
                        font-size:1.2rem;
                    ">
                        ⚠️ Developer Tools terdeteksi.<br>
                        Akses ini dinonaktifkan untuk menjaga integritas praktikum.
                    </div>`;
                setTimeout(() => location.reload(), 2000);
            }
        } else {
            devtoolsOpen = false;
        }
    }

    // 2️⃣ Cek setiap 1 detik
    setInterval(detectDevTools, 1000);

    // 3️⃣ Blokir klik kanan & shortcut
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) ||
            (e.ctrlKey && ['U','S'].includes(e.key.toUpperCase()))
        ) {
            e.preventDefault();
            alert('❌ Akses dibatasi.');
        }
    });

    // 4️⃣ Nonaktifkan copy, select, drag
    ['copy','cut','paste','selectstart','dragstart'].forEach(evt =>
        document.addEventListener(evt, e => e.preventDefault())
    );
})();
