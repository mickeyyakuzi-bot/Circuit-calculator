const modes = {
  current: {
    symbol: "I", label: "ELECTRIC CURRENT", unit: "A",
    fields: [{ label: "Voltage", symbol: "V", unit: "V" }, { label: "Resistance", symbol: "R", unit: "Ω" }],
    formula: "I = V / R", hint: "Enter voltage and resistance to calculate current.",
    description: "The rate of electric charge flowing through a conductor.",
    calculate: (a, b) => a / b, substitute: (a, b) => `I = ${fmt(a)} / ${fmt(b)}`
  },
  voltage: {
    symbol: "V", label: "ELECTRIC VOLTAGE", unit: "V",
    fields: [{ label: "Current", symbol: "I", unit: "A" }, { label: "Resistance", symbol: "R", unit: "Ω" }],
    formula: "V = I × R", hint: "Enter current and resistance to calculate voltage.",
    description: "The electrical potential difference between two points.",
    calculate: (a, b) => a * b, substitute: (a, b) => `V = ${fmt(a)} × ${fmt(b)}`
  },
  resistance: {
    symbol: "R", label: "ELECTRIC RESISTANCE", unit: "Ω",
    fields: [{ label: "Voltage", symbol: "V", unit: "V" }, { label: "Current", symbol: "I", unit: "A" }],
    formula: "R = V / I", hint: "Enter voltage and current to calculate resistance.",
    description: "The opposition a material presents to electric current.",
    calculate: (a, b) => a / b, substitute: (a, b) => `R = ${fmt(a)} / ${fmt(b)}`
  },
  power: {
    symbol: "P", label: "ELECTRICAL POWER", unit: "W",
    fields: [{ label: "Voltage", symbol: "V", unit: "V" }, { label: "Current", symbol: "I", unit: "A" }],
    formula: "P = V × I", hint: "Enter voltage and current to calculate electrical power.",
    description: "The rate at which electrical energy is transferred.",
    calculate: (a, b) => a * b, substitute: (a, b) => `P = ${fmt(a)} × ${fmt(b)}`
  }
};

const inputOne = document.getElementById("valueOne");
const inputTwo = document.getElementById("valueTwo");
const modeButtons = [...document.querySelectorAll(".mode-card")];
let activeMode = "current";

function fmt(value) {
  return Number(value).toLocaleString("en-US", { maximumFractionDigits: 6 });
}
function formatResult(value) {
  if (!Number.isFinite(value)) return "—";
  return Number(value).toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 4 });
}
function setMode(mode) {
  activeMode = mode;
  const config = modes[mode];
  modeButtons.forEach(button => {
    const selected = button.dataset.mode === mode;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.getElementById("labelOne").innerHTML = `${config.fields[0].label} <b>(${config.fields[0].symbol})</b>`;
  document.getElementById("labelTwo").innerHTML = `${config.fields[1].label} <b>(${config.fields[1].symbol})</b>`;
  document.getElementById("unitOne").textContent = config.fields[0].unit;
  document.getElementById("unitTwo").textContent = config.fields[1].unit;
  document.getElementById("inputHint").textContent = config.hint;
  document.getElementById("formula").textContent = config.formula;
  document.getElementById("resultSymbol").textContent = config.symbol;
  document.getElementById("resultLabel").textContent = config.label;
  document.getElementById("resultUnit").textContent = config.unit;
  document.getElementById("resultDescription").textContent = config.description;
  calculate();
}
function calculate() {
  const config = modes[activeMode];
  const rawA = inputOne.value.trim();
  const rawB = inputTwo.value.trim();
  const a = Number(rawA), b = Number(rawB);
  const needsDivision = activeMode === "current" || activeMode === "resistance";
  const valid = rawA !== "" && rawB !== "" && Number.isFinite(a) && Number.isFinite(b) &&
    a >= 0 && b >= 0 && (!needsDivision || b !== 0);
  const resultValue = document.getElementById("resultValue");
  const answer = document.getElementById("workingAnswer");
  if (!valid) {
    resultValue.textContent = "—";
    answer.textContent = needsDivision && rawB !== "" && b === 0 ? "Cannot divide by zero." : "Enter valid non-negative values.";
    document.getElementById("workingLineOne").textContent = config.formula;
    document.getElementById("workingLineTwo").textContent = "Waiting for valid inputs…";
    document.getElementById("resultDescription").textContent = "Check your inputs to calculate a result.";
    return;
  }
  const result = config.calculate(a, b);
  resultValue.textContent = formatResult(result);
  document.getElementById("workingLineOne").textContent = config.formula;
  document.getElementById("workingLineTwo").textContent = config.substitute(a, b);
  answer.textContent = `${config.symbol} = ${fmt(result)} ${config.unit}`;
  document.getElementById("resultDescription").textContent = config.description;
}
modeButtons.forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));
inputOne.addEventListener("input", calculate);
inputTwo.addEventListener("input", calculate);
document.getElementById("resetButton").addEventListener("click", () => {
  inputOne.value = "12";
  inputTwo.value = "6";
  setMode("current");
});
setMode("current");
