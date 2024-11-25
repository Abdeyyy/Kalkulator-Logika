const display = document.getElementById("display");

function appendValue(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
    document.getElementById("truthTable").innerHTML = "";
}

function calculate() {
    const expr = display.value.trim();

    const variables = getVariables(expr);

    if (variables.length === 0) {
        display.value = "Error: No variables found!";
        return;
    }

    const combinations = generateCombinations(variables.length);

    let tableHTML = "<table border='1'><tr>";

    for (let i = 0; i < variables.length; i++) {
        tableHTML += "<th>" + variables[i] + "</th>";
    }

    tableHTML += "<th>" + expr + "</th></tr>"; 

    let finalResult = "";

    for (let i = 0; i < combinations.length; i++) {
        let evalExpr = expr; 

        for (let j = 0; j < variables.length; j++) {
            evalExpr = evalExpr.replace(
                new RegExp(variables[j], "g"),
                combinations[i][j] ? "true" : "false"
            );
        }

        evalExpr = evalExpr
            .replace(/∧/g, "&&")  
            .replace(/∨/g, "||")  
            .replace(/¬/g, "!")   
            .replace(/↔/g, "===") 
            .replace(/→/g, "!$& ||"); 

        let result;
        try {
            result = eval(evalExpr); 
        } catch (e) {
            result = false; 
        }

        if (i === 0) {
            finalResult = result ? "T" : "F";
        }

        tableHTML += "<tr>";
        for (let j = 0; j < combinations[i].length; j++) {
            tableHTML += "<td>" + (combinations[i][j] ? "T" : "F") + "</td>";
        }

        tableHTML += "<td>" + (result ? "T" : "F") + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("truthTable").innerHTML = tableHTML;

    display.value = finalResult;
}


function getVariables(expr) {
    return [...new Set(expr.match(/[A-Z]/g))];  
}

function generateCombinations(n) {
    const combinations = [];
    for (let i = 0; i < Math.pow(2, n); i++) {
        let combination = [];
        for (let j = 0; j < n; j++) {
            combination.push(!!(i & (1 << (n - j - 1))));
        }
        combinations.push(combination);
    }
    return combinations;
}
