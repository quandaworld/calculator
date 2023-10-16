const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const entry = document.getElementById('entry');
const ans = document.getElementById('ans');
const ac_button = document.getElementById('ac');
const ce_button = document.getElementById('ce');
const percent_button = document.getElementById('percent');
const decimal_button = document.getElementById('decimal');
const negative_button = document.getElementById('negative');
const equal_button = document.getElementById('equal');
const regex = /[+−×÷]/g;


numbers.forEach(button => button.addEventListener('click', appendNumbers));
operators.forEach(button => button.addEventListener('click', appendOperators));
window.addEventListener('keydown', handleKeyboardInput);
ce_button.addEventListener('click', clearEntry);
ac_button.addEventListener('click', clearAllEntry);
percent_button.addEventListener('click', appendPercent);
decimal_button.addEventListener('click', appendDecimal);
negative_button.addEventListener('click', appendNegativeSign);
equal_button.addEventListener('click', calculate);

function createEntryArr() {
  return entry.textContent.split(' ').filter(value => value !== '');
}

function resetCalculation(e) {
  if (!isCalculated()) return;
  if (isValidNumber(e.target.textContent) || isValidNumber(e.key)) {
    entry.textContent = '';
  } else {
    if (!isValidNumber(ans.textContent)) {
      entry.textContent = '0';
    } else {
      entry.textContent = ans.textContent;
    }
  } 
}

function appendNumbers(e) {
  resetCalculation(e);
  const currValues = createEntryArr();
  if (currValues.length === 1 && currValues[0] === '0') entry.textContent = '';
  if (currValues.length === 3 && currValues[2] === '0') entry.textContent = entry.textContent.slice(0, -1);
  if (e.type === 'click') entry.textContent += e.target.textContent;
  if (e.type === 'keydown') entry.textContent += e.key;
}

function appendOperatorsByEventType(e) {
  if (e.type === 'click') entry.textContent += ` ${e.target.textContent} `;
  if (e.type === 'keydown') {
    if (e.key === '+') entry.textContent += ' + ';
    if (e.key === '-') entry.textContent += ' − ';
    if (e.key === '*') entry.textContent += ' × ';
    if (e.key === '/') entry.textContent += ' ÷ ';
  }
}

function appendOperators(e) {
  resetCalculation(e);
  const currValues = createEntryArr();
  if (!currValues[1]) { // check if operator has been input
    if (entry.textContent === '') entry.textContent = '0'; // if firstOperand is empty, set it to zero
    appendOperatorsByEventType(e);
  } else {
    if (entry.textContent.slice(-2, -1).match(regex)) {
      entry.textContent = entry.textContent.slice(0, -3); // update operator immediately
      appendOperatorsByEventType(e);
    } else {
      calculate();
      entry.textContent = ans.textContent;
      appendOperatorsByEventType(e);
    }
  }
}

function isCalculated() {
  return (entry.textContent.includes('='));
}

function calculate() {
  if (isCalculated()) return;
  if (entry.textContent === '') entry.textContent = '0';
  ans.textContent = operate(createEntryArr());
  entry.textContent += ' =';
}

function isValidNumber(value) {
  return (Number.isFinite(Number(value)));
}

function appendPercent() {
  if (isCalculated()) {
    if (isValidNumber(ans.textContent)) { 
      return ans.textContent = divide(Number(ans.textContent), 100);
    } else {
      return ans.textContent = 'invalid input';
    }
  }
  
  const currValues = createEntryArr();
  if (currValues.length === 1) {
    entry.textContent = divide(Number(currValues[0]), 100);
  } else if (currValues.length === 3) {
    currValues[2] = divide(Number(currValues[2]), 100);
    entry.textContent = currValues.join(' ');
  }
}

function appendDecimal() {
  if (isCalculated() || entry.textContent === '') return entry.textContent = '0.';

  const currValues = createEntryArr();
  if (currValues.length === 1 && !currValues[0].includes('.')) {
    entry.textContent += '.';
  } else if (currValues.length === 2) {
    entry.textContent += '0.';
  } else if (currValues.length === 3 && !currValues[2].includes('.')) {
    currValues[2] += '.';
    entry.textContent = currValues.join(' ');
  }
}

function appendNegativeSign() {
  if (isCalculated()) {
    if (isValidNumber(ans.textContent)) {
      if (ans.textContent[0] !== '-') {
        return ans.textContent = '-' + ans.textContent;
      } else {
        return ans.textContent = ans.textContent.slice(1);
      }
    } else {
      return ans.textContent = 'invalid input';
    }
  }

  const currValues = createEntryArr();
  if (currValues.length === 1) {
    if (currValues[0][0] !== '-') {
      entry.textContent = '-' + entry.textContent;
    } else {
      entry.textContent = entry.textContent.slice(1);
    }
  } else if (currValues.length === 3) {
    if (currValues[2][0] !== '-') {
      currValues[2] = '-' + currValues[2];
    } else {
      currValues[2] = currValues[2].slice(1);
    }
    entry.textContent = currValues.join(' ');
  }
}

function clearEntry() {
  if (isCalculated()) return;
  if (entry.textContent.slice(-2, -1).match(regex)) {
    entry.textContent = entry.textContent.slice(0, -3);
  } else {
    entry.textContent = entry.textContent.slice(0, -1);
  }
}

function clearAllEntry() {
  entry.textContent = '';
  ans.textContent = '';
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumbers(e);
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperators(e);
  if (e.key === '%') appendPercent();
  if (e.key === 'Backspace') clearEntry();
  if (e.key === 'Escape') clearAllEntry();
  if (e.key === 'Enter' || e.key === '=') calculate();
  if (e.key === '.') appendDecimal();
}

const add = (a, b) => {
  return toFixedWithoutZeros(a + b);
};

const subtract = (a, b) => {
  return toFixedWithoutZeros(a - b);
};

const multiply = (a, b) => {
  return toFixedWithoutZeros(a * b);
};

const divide = (a, b) => {
  return toFixedWithoutZeros(a / b);
};

const toFixedWithoutZeros = (num, precision = 20) => {
  return `${Number.parseFloat(num.toFixed(precision))}`;
}

const operate = (values) => {
  values[0] = Number(values[0]);
  if (values.length === 1) return toFixedWithoutZeros(values[0]);
  if (values.length < 3) return 'missing input';
  values[2] = Number(values[2]);

  switch(values[1]) {
    case '+':
      return add(values[0], values[2]);
    case '−': 
      return subtract(values[0], values[2]);
    case '×':
      return multiply(values[0], values[2]);
    case '÷':
      if (values[2] === 0) return ans.textContent = 'invalid input';
      return divide(values[0], values[2]);
  }
};