let expressionDisplay = document.getElementById("expression");
let resultDisplay = document.getElementById("result");

let currentInput = "";
let operator = "";
let previousInput = "";

// Append numbers
function append(value) {
  if (value === "." && currentInput.includes(".")) return;

  currentInput += value;
  updateDisplay();
}

// Operator
function appendOperator(op) {
  if (currentInput === "") return;

  if (previousInput !== "") {
    calculate();
  }

  operator = op;
  previousInput = currentInput;
  currentInput = "";

  updateDisplay();
}

// Update display
function updateDisplay() {
  expressionDisplay.innerText =
    previousInput + " " + operator + " " + currentInput;

  if (currentInput !== "") {
    resultDisplay.innerText = currentInput;
  }
}

// Calculate
function calculate() {
  let prev = parseFloat(previousInput);
  let curr = parseFloat(currentInput);
  let result;

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = curr === 0 ? "Error" : prev / curr;
      break;
    default:
      return;
  }

  expressionDisplay.innerText =
    previousInput + " " + operator + " " + currentInput;

  resultDisplay.innerText = result;

  currentInput = result.toString();
  previousInput = "";
  operator = "";
}

// Clear
function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  expressionDisplay.innerText = "";
  resultDisplay.innerText = "0";
}

// Delete
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}


document.addEventListener("keydown", function(event) {
  const key = event.key;

  // Numbers
  if (!isNaN(key)) {
    append(key);
  }

  // Operators
  else if (key === "+") {
    appendOperator("+");
  } else if (key === "-") {
    appendOperator("-");
  } else if (key === "*") {
    appendOperator("*");
  } else if (key === "/") {
    appendOperator("/");
  }

  // Enter = calculate
  else if (key === "Enter") {
    calculate();
  }

  // Backspace = delete
  else if (key === "Backspace") {
    deleteLast();
  }

  // Escape = clear
  else if (key === "Escape") {
    clearDisplay();
  }

  // Decimal
  else if (key === ".") {
    append(".");
  }
});