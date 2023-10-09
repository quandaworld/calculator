const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const entry = document.getElementById('entry');
const current = document.getElementById('current');
const ac_button = document.getElementById('ac');
const ce_button = document.getElementById('ce');
const percent_button = document.getElementById('percent');
const decimal_button = document.getElementById('decimal');
const negative_button = document.getElementById('negative');
const equal_button = document.getElementById('equal');
let firstNum = 0;
let secondNum = 0;
let operator = '';

function appendNumbers(e) {
  if (e.type === 'click') entry.innerText += `${e.target.innerText}`;
  if (e.type === 'keydown') entry.innerText += `${e.key}`;
}

function appendOperators(e) {
  if (e.type === 'click') entry.innerText += ` ${e.target.innerText}`;
  if (e.type === 'keydown') {
    if (e.key === '+') entry.innerText += ' +';
    if (e.key === '-') entry.innerText += ' −';
    if (e.key === '*') entry.innerText += ' ×';
    if (e.key === '/') entry.innerText += ' ÷';
  }
}

function appendPercent() {
  if (e.type === 'click') entry.innerText += ` ${e.target.innerText}`;
  if (e.type === 'keydown') entry.innerText += ` ${e.key}`;
}

function appendDecimal() {
  // if (e.type === 'click') entry.innerText += ` ${e.target.innerText}`;
  // if (e.type === 'keydown') entry.innerText += ` ${e.key}`;
}

function appendNegativeSign() {
  // if (e.type === 'click') entry.innerText += ` ${e.target.innerText}`;
  // if (e.type === 'keydown') entry.innerText += ` ${e.key}`;
}

function appendEqual() {
  // if (e.type === 'click') entry.innerText += ` ${e.target.innerText}`;
  // if (e.type === 'keydown') entry.innerText += ` ${e.key}`;
}

function clearEntry() {
  entry.innerText = entry.innerText.slice(0, entry.innerText.length - 1);
}

function clearAllEntry() {
  location.reload(); // will be updated to reset all variables
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumbers(e);
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperators(e);
  if (e.key === '%') appendPercent();
  if (e.key === 'Backspace') clearEntry();
  if (e.key === 'Escape') clearAllEntry();
  console.log(e);
}

window.addEventListener('keydown', handleKeyboardInput);

numbers.forEach(button => button.addEventListener('click', appendNumbers));

operators.forEach(button => button.addEventListener('click', appendOperators));

ce_button.addEventListener('click', clearEntry);

ac_button.addEventListener('click', clearAllEntry);

percent_button.addEventListener('click', appendPercent);

decimal_button.addEventListener('click', appendDecimal);

negative_button.addEventListener('click', appendNegativeSign);

equal_button.addEventListener('click', appendEqual);

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operate = (operator, firstNum, secondNum) => {
  switch(operator) {
    case '+':
      return add(firstNum, secondNum);
    case '-':
      return subtract(firstNum, secondNum);
    case '*':
      return multiply(firstNum, secondNum);
    case '/':
      return divide(firstNum, secondNum);
  }
};