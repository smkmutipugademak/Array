let pyodideReady = false;
let pyodide;

async function initPyodide() {
    pyodide = await loadPyodide();
    pyodideReady = true;
}

initPyodide();

document.getElementById("runBtn").addEventListener("click", async () => {
    const editable = document.getElementById("editable");
    const output = document.getElementById("output");
    const code = `
${editable.value}
print(len(number))
print(sum(number))
print(max(number))
print(min(number))
print(number.count(5))
print(number.index(4))
`;

    output.textContent = "🚀 Menjalankan kode Python...";
    if (!pyodideReady) {
        output.textContent = "⏳ Memuat Python (tunggu sebentar)...";
        await initPyodide();
    }

    try {
        const result = await pyodide.runPythonAsync(code);
        output.style.color = "#79c0ff";
        output.textContent = result || "✅ Kode berhasil dijalankan tanpa output tambahan.";
        explainOutput(editable.value);
    } catch (error) {
        output.style.color = "#ff7b72";
        output.textContent = "❌ Terjadi error:\n" + error;
    }
});

// ✨ Penjelasan otomatis hasil kode
function explainOutput(codeText) {
    const info = document.createElement("div");
    info.style.marginTop = "10px";
    info.style.padding = "10px";
    info.style.background = "#1a1f27";
    info.style.borderRadius = "8px";
    info.style.color = "#d2a8ff";
    info.innerHTML = "";

    try {
        const match = codeText.match(/\[(.*?)\]/);
        if (match) {
            const arr = JSON.parse("[" + match[1] + "]");
            info.innerHTML = `
        <b>Analisis hasil:</b><br>
        • Jumlah elemen: ${arr.length}<br>
        • Total nilai: ${arr.reduce((a, b) => a + b, 0)}<br>
        • Nilai terbesar: ${Math.max(...arr)}<br>
        • Nilai terkecil: ${Math.min(...arr)}<br>
        • Jumlah angka 5: ${arr.filter(x => x === 5).length}<br>
        • Posisi angka 4: ${arr.indexOf(4) >= 0 ? arr.indexOf(4) : "tidak ada"}
      `;
        } else {
            info.textContent = "Tidak dapat menganalisis list. Pastikan format array benar.";
        }
    } catch {
        info.textContent = "❗ Pastikan format list Python benar, contoh: [2, 4, 5]";
    }

    const outputSection = document.querySelector(".output-section");
    const old = document.querySelector(".auto-info");
    if (old) old.remove();
    info.classList.add("auto-info");
    outputSection.appendChild(info);
}
