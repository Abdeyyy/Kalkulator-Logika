// Referensi ke elemen input (layar kalkulator)
const display = document.getElementById("display");

// Objek untuk mengatur teks tombol dan hasil berdasarkan bahasa
const tfBahasa = {
    en: { true: "T", false: "F", trueResult: "T", falseResult: "F" },   // Bahasa Inggris
    id: { true: "B", false: "S", trueResult: "B", falseResult: "S" },   // Bahasa Indonesia
    bin: { true: "1", false: "0", trueResult: "1", falseResult: "0" },  // Biner
};

// Bahasa saat ini, default adalah Bahasa Inggris
let currentLanguage = 'en';

// Fungsi untuk menambahkan nilai ke layar kalkulator
function appendValue(input) {
    display.value += input;
}

// Fungsi untuk menghapus semua nilai dari layar kalkulator
function clearDisplay() {
    display.value = "";
}

// Fungsi untuk menghapus karakter terakhir di layar kalkulator
function backspace() {
    display.value = display.value.slice(0, -1);
}

// Fungsi untuk menghitung ekspresi logika
function calculate() {
    const operators = display.value.trim(); // Ambil input dari layar dan hapus spasi ekstra

    // Ganti simbol logika dengan operator JavaScript
    const jsOperators = operators
        .replace(/T/g, "true")       // Ganti 'T' dengan true
        .replace(/F/g, "false")      // Ganti 'F' dengan false
        .replace(/→/g, "<=")         // Ganti '→' dengan logika implikasi
        .replace(/∧/g, "&&")         // Ganti '∧' dengan AND
        .replace(/∨/g, "||")         // Ganti '∨' dengan OR
        .replace(/¬/g, "!")          // Ganti '¬' dengan NOT
        .replace(/↔/g, "===")        // Ganti '↔' dengan ekuivalen
        .replace(/⊕/g, "!=")         // Ganti '⊕' dengan XOR
        .replace(/\(/g, "(")         // Pastikan '(' valid
        .replace(/\)/g, ")")         // Pastikan ')' valid
        .replace(/B/g, "true")       // Ganti 'B' (Indonesia) dengan true
        .replace(/S/g, "false");     // Ganti 'S' (Indonesia) dengan false

    try {
        // Evaluasi ekspresi logika diatas
        const hasil = eval(jsOperators);

        // Tampilkan hasil dalam bahasa yang dipilih
        display.value = hasil ? tfBahasa[currentLanguage].trueResult : tfBahasa[currentLanguage].falseResult;
    } catch (err) {
        // Tampilkan "Error" jika ada kesalahan dalam evaluasi
        display.value = "Error";
    }
}

// Fungsi untuk mengubah bahasa kalkulator
function gantiBahasa(language) {
    const trueButton = document.getElementById("trueButton");  // Tombol untuk nilai "true"
    const falseButton = document.getElementById("falseButton"); // Tombol untuk nilai "false"

    // Perbarui teks tombol berdasarkan bahasa yang dipilih
    trueButton.textContent = tfBahasa[language].true;
    falseButton.textContent = tfBahasa[language].false;

    // Perbarui fungsi klik tombol untuk menambahkan nilai yang sesuai
    trueButton.setAttribute("onclick", `appendValue('${tfBahasa[language].true}')`);
    falseButton.setAttribute("onclick", `appendValue('${tfBahasa[language].false}')`);

    // Setel bahasa saat ini
    currentLanguage = language;

    // Kosongkan layar kalkulator saat bahasa diubah
    clearDisplay();
}

// Tambahkan event listener untuk dropdown pilihan bahasa
document.getElementById("dropdown").addEventListener("change", (event) => {
    const bahasaPilihan = event.target.value;  // Ambil nilai bahasa yang dipilih
    gantiBahasa(bahasaPilihan);               // Panggil fungsi untuk mengganti bahasa
});

// Inisialisasi bahasa default ke Bahasa Inggris
gantiBahasa("en");
