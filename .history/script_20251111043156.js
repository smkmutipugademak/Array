document.getElementById("runBtn").addEventListener("click", () => {
    const userCode = document.getElementById("editable").value;
    const baseCode = `
${userCode}
print(len(number))
print(sum(number))
print(max(number))
print(min(number))
print(number.count(5))
print(number.index(4))
`;

    runPython(baseCode);
});

async function runPython(code) {
    const output = document.getElementById("output");
    output.textContent = "⏳ Menjalankan kode...";

    try {
        // Gunakan Pyodide (Python di browser)
        if (!window.pyodide) {
            output.textContent = "🔄 Memuat Python...";
            window.pyodide = await loadPyodide();
        }

        let result = await window.pyodide.runPythonAsync(code);
        output.textContent = result || "✅ Kode berhasil dijalankan tanpa output tambahan.";
    } catch (err) {
        output.textContent = "❌ Error:\n" + err;
    }
}

// Load Pyodide
import("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.mjs");
