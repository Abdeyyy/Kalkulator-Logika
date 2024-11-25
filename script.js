const display = document.getElementById("display");

const tfBahasa = {
    en: { true: "T", false: "F", trueResult: "T", falseResult: "F" },   
    id: { true: "B", false: "S", trueResult: "B", falseResult: "S" },  
    bin: { true: "1", false: "0", trueResult: "1", falseResult: "0" },  
};

let currentLanguage = 'en'

function appendValue(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0 , -1);
}

function calculate() {
    const operators = display.value.trim();

    const jsOperators = operators
      .replace(/T/g, "true")
      .replace(/F/g, "false")
      .replace(/→/g, "<=")     
      .replace(/∧/g, "&&")         
      .replace(/∨/g, "||")         
      .replace(/¬/g, "!")          
      .replace(/↔/g, "===")
      .replace(/⊕/g, "!=")
      .replace(/\(/g, "(")
      .replace(/\)/g, ")")
      .replace(/B/g, "true")
      .replace(/S/g, "false");

try {
    const hasil = eval(jsOperators);

    display.value = hasil ? tfBahasa[currentLanguage].trueResult : tfBahasa[currentLanguage].falseResult;
}
catch(err) {
    display.value = "Error";
}

}

function gantiBahasa(language) {
    const trueButton = document.getElementById("trueButton");
    const falseButton = document.getElementById("falseButton");

    trueButton.textContent = tfBahasa[language].true;
    falseButton.textContent = tfBahasa[language].false;

    trueButton.setAttribute("onclick", `appendValue('${tfBahasa[language].true}')`);
    falseButton.setAttribute("onclick", `appendValue('${tfBahasa[language].false}')`);

    currentLanguage = language;

    clearDisplay();
}

document.getElementById("dropdown").addEventListener("change", (event) => {
    const bahasaPilihan = event.target.value;
    gantiBahasa(bahasaPilihan);
});

gantiBahasa("en");
