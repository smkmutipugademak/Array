// ===========================
//  Default Code (Template)
// ===========================
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

// Inisialisasi awal
document.getElementById("editor").value = defaultCode;

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

// Reset ke default
document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Yakin ingin mengembalikan kode ke versi awal? Semua perubahan akan hilang.")) {
        document.getElementById("editor").value = defaultCode;
        document.getElementById("output").innerHTML = "";
    }
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
