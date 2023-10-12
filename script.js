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

function appendNumbers(e) {
  resetCalculation(e);
  if (e.type === 'click') {
    if (entry.textContent.slice(-1).match(regex)) entry.textContent += ' '; // might need to move out when adding keyboard support
    entry.textContent += e.target.textContent;
  } 
  // if (e.type === 'keydown') {
  //   entry.textContent += e.key;
  // }
}

function hasOperator(str, arr) {
  for (const char of arr) {
    if (str.includes(char)) return true;
  }
  return false;
}

function appendOperators(e) {
  resetCalculation(e);
  if (!hasOperator(entry.textContent, ['+', '−', '×', '÷'])) {
    if (entry.textContent === '') entry.textContent = '0'; // if firstOperand is empty, set it to zero
    if (e.type === 'click') {
      entry.textContent += ` ${e.target.textContent} `;
    }
    // if (e.type === 'keydown') {
    //   if (e.key === '+') entry.textContent += ' + ';
    //   if (e.key === '-') entry.textContent += ' − ';
    //   if (e.key === '*') entry.textContent += ' × ';
    //   if (e.key === '/') entry.textContent += ' ÷ ';
    // }
  } else {
    if (entry.textContent.slice(-2, -1).match(regex)) {
      entry.textContent = entry.textContent.slice(0, -2) + `${e.target.textContent} `; // to update operator immediately
    } else if (entry.textContent.slice(-1).match(regex)) {
      entry.textContent = entry.textContent.slice(0, -1) + `${e.target.textContent} `;
    } else {
      calculate();
      entry.textContent = ans.textContent + ` ${e.target.textContent} `;
    }
  }
}

function isCalculated() {
  return (entry.textContent.includes('='));
}

function calculate() {
  if (isCalculated()) return;
  ans.textContent = operate(entry.textContent.split(' ').filter(value => value !== ''));
  entry.textContent += ' =';
}

function resetCalculation(e) {
  if (!isCalculated()) return; // can't reset if calculation has not been done
  if (Number(e.target.textContent)) {
    entry.textContent = '';
  } else {
    if (!Number(ans.textContent)) {
      entry.textContent = '0';
    } else  {
      entry.textContent = ans.textContent;
    }
  } 
}

function appendPercent() {
  if (isCalculated()) {
    if (Number(ans.textContent)) {
      ans.textContent = Number(ans.textContent) / 100;
    } else {
      return ans.textContent = 'invalid input';
    }
  }
  const currValues = entry.textContent.split(' ').filter(value => value !== '');
  if (currValues.length === 1) {
    entry.textContent = Number(currValues[0]) / 100;
  } else if (currValues.length === 3) {
    currValues[2] = Number(currValues[2]) / 100;
    entry.textContent = currValues.join(' ');
  }
}

function appendDecimal() {
  if (isCalculated() || entry.textContent === '') return entry.textContent = '0.';
  const currValues = entry.textContent.split(' ').filter(value => value !== '');
  if (currValues.length === 1 && !currValues[0].includes('.')) {
    entry.textContent += '.';
  } else if (currValues.length === 2 && !currValues[1].includes('.')) {
    entry.textContent += '0.';
  } else if (currValues.length === 3 && !currValues[2].includes('.')) {
    currValues[2] += '.';
    entry.textContent = currValues.join(' ');
  }
}

function appendNegativeSign() {
  if (isCalculated()) {
    if (Number(ans.textContent)) {
      if (ans.textContent[0] !== '-') {
        ans.textContent = '-' + ans.textContent;
      } else {
        ans.textContent = ans.textContent.slice(1);
      }
    } else {
      return ans.textContent = 'invalid input';
    }
  }
  const currValues = entry.textContent.split(' ').filter(value => value !== '');
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
  if (isCalculated()) return; // can't clear entry after calculation has been done
  if (entry.textContent.slice(-2, -1) === ' ') {
    entry.textContent = entry.textContent.slice(0, -2);
  } else if (entry.textContent.slice(-2, -1).match(regex)) {
    entry.textContent = entry.textContent.slice(0, -3);
  } else {
    entry.textContent = entry.textContent.slice(0, -1);
  }
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
  // console.log(e);
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

const operate = (values) => {
  if (values.length === 1) return values[0];
  if (values.length < 3) return 'missing input';
  values[0] = Number(values[0]);
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



// Bugs:
// 1. cannot perform next calculation immediately by hitting operators, will need to 2 '+' to perform a plus on ans

// Refactoring:
// 1. create handleNaN to handle 'Ans: NaN'; only if 'invalid input' handlers become repetitive among symbols functions