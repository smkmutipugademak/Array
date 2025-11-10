let pyodideReady = false;
let pyodide;

// Inisialisasi Pyodide
async function initPyodide() {
    pyodide = await loadPyodide();
    pyodideReady = true;
}

initPyodide();

const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");
const output = document.getElementById("output");

runBtn.addEventListener("click", async () => {
    const code = document.getElementById("editor").value;
    output.textContent = "⏳ Menjalankan kode Python...";

    if (!pyodideReady) {
        output.textContent = "🔄 Memuat Python ke browser...";
        await initPyodide();
    }

    try {
        const result = await pyodide.runPythonAsync(code);
        if (result !== undefined) {
            output.textContent += "\n" + result;
        } else {
            output.textContent = "✅ Kode berhasil dijalankan tanpa output tambahan.";
        }
    } catch (error) {
        output.textContent = "❌ Error:\n" + error;
    }
});

clearBtn.addEventListener("click", () => {
    output.textContent = "";
});
