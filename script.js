const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const allEntry = document.getElementById('entry');
const currentEntry = document.getElementById('current');
const ac_button = document.getElementById('ac');
const ce_button = document.getElementById('ce');
const percent_button = document.getElementById('percent');
const decimal_button = document.getElementById('decimal');
const negative_button = document.getElementById('negative');
const equal_button = document.getElementById('equal');
let firstNum = 0;
let secondNum = 0;
let operator = '';

numbers.forEach(button => button.addEventListener('click', appendNumbers));
operators.forEach(button => button.addEventListener('click', appendOperators));
window.addEventListener('keydown', handleKeyboardInput);
ce_button.addEventListener('click', clearEntry);
ac_button.addEventListener('click', clearAllEntry);
percent_button.addEventListener('click', appendPercent);
decimal_button.addEventListener('click', appendDecimal);
negative_button.addEventListener('click', appendNegativeSign);
equal_button.addEventListener('click', appendEqual);

function appendNumbers(e) {
  if (e.type === 'click') {
    allEntry.textContent += e.target.textContent;
  } 
  if (e.type === 'keydown') {
    allEntry.textContent += e.key;
  }
}

function appendOperators(e) {
  if (e.type === 'click') {
    allEntry.textContent += ` ${e.target.textContent} `;
  }
  if (e.type === 'keydown') {
    if (e.key === '+') allEntry.textContent += ' + ';
    if (e.key === '-') allEntry.textContent += ' − ';
    if (e.key === '*') allEntry.textContent += ' × ';
    if (e.key === '/') allEntry.textContent += ' ÷ ';
  }
}

function appendPercent() {
  // if (e.type === 'click') allEntry.textContent += ` ${e.target.textContent}`;
  // if (e.type === 'keydown') allEntry.textContent += ` ${e.key}`;
}

function appendDecimal() {
  // if (e.type === 'click') allEntry.textContent += ` ${e.target.textContent}`;
  // if (e.type === 'keydown') allEntry.textContent += ` ${e.key}`;
}

function appendNegativeSign() {
  // if (e.type === 'click') allEntry.textContent += ` ${e.target.textContent}`;
  // if (e.type === 'keydown') allEntry.textContent += ` ${e.key}`;
}

function appendEqual() {
  currentEntry.textContent = operate(allEntry.textContent.split(' '));
}

function clearEntry() {
  allEntry.textContent = allEntry.textContent.slice(0, allEntry.textContent.length - 1);
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
  if (a % b !== 0) return (a / b).toFixed(5);
  return a / b;
};

const operate = ([a, operator, b]) => {
  a = Number(a);
  b = Number(b);
  switch(operator) {
    case '+':
      return add(a, b);
    case '−':
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    case '÷':
      return divide(a, b);
  }
};