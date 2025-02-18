/*-------------------------------- Constants --------------------------------*/
const regex = /[+−×÷]/g;

/*------------------------ Cached Element References ------------------------*/
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const entry = document.getElementById('entry');
const ans = document.getElementById('ans');
const acButton = document.getElementById('ac');
const delButton = document.getElementById('del');
const percentButton = document.getElementById('percent');
const decimalButton = document.getElementById('decimal');
const negativeButton = document.getElementById('negative');
const equalButton = document.getElementById('equal');

/*----------------------------- Event Listeners -----------------------------*/
numberButtons.forEach(button => button.addEventListener('click', appendNumbers));
operatorButtons.forEach(button => button.addEventListener('click', appendOperators));
delButton.addEventListener('click', clearSingleEntry);
acButton.addEventListener('click', clearAllEntry);
percentButton.addEventListener('click', appendPercent);
decimalButton.addEventListener('click', appendDecimal);
negativeButton.addEventListener('click', appendNegativeSign);
equalButton.addEventListener('click', calculate);
window.addEventListener('keydown', handleKeyboardInput);

/*-------------------------------- Functions --------------------------------*/

/*-------------------- DOM Manipulation --------------------*/
// Store entry input in an array
function createEntryArr() {
  return entry.textContent.split(' ').filter(value => value !== '');
}

// Helper method for appendNumbers(e) and appendOperators(e), reset calculation to perform next calculation
function resetCalculation(e) {
  if (!isCalculated()) return; // Exit if calculation is not done

  if (isValidNumber(e.target.textContent) || isValidNumber(e.key)) { // Clear entry if input is a number
    entry.textContent = '';
  } else { // If input is an operator
    if (!isValidNumber(ans.textContent)) { // If current answer is not a number, set first operand to zero
      entry.textContent = '0';
    } else { // Otherwise, set first operand to currently displayed answer
      entry.textContent = ans.textContent; 
    }
  } 
}

// Append numbers to calculator's entry
function appendNumbers(e) {
  resetCalculation(e);
  const entryValues = createEntryArr();

  const input = e.type === 'click' ? e.target.textContent : e.key;

  // Prevent multiple leading zeros input
  if (entryValues.length === 1 && entryValues[0] === '0') entry.textContent = '';
  if (entryValues.length === 3 && entryValues[2] === '0') entry.textContent = entry.textContent.slice(0, -1);

  entry.textContent += input;
}

// Helper method for appendOperators(e)
function appendOperatorsByEventType(e) {
  const operatorMap = { '+': ' + ', '-': ' − ', '*': ' × ', '/': ' ÷ ' };

  if (e.type === 'click') entry.textContent += ` ${e.target.textContent} `;
  if (e.type === 'keydown' && operatorMap[e.key]) entry.textContent += operatorMap[e.key];
}

// Append operators to calculator's entry
function appendOperators(e) {
  resetCalculation(e);
  const entryValues = createEntryArr();
  const lastChar = entry.textContent.slice(-2, -1); // Exclude last space
  const isOperator = lastChar.match(regex); // True if last character is an operator, false if otherwise

  if (!entryValues[1]) { // If operator has not been input
    if (entry.textContent === '') entry.textContent = '0'; // If first operand is empty, default it to zero
  } else if (isOperator){ // If operator has been input
    entry.textContent = entry.textContent.slice(0, -3); // Update operator immediately
  } else { // Perform calculation on two current operand and default the next first operand to the answer
    calculate();
    entry.textContent = ans.textContent;
  }

  appendOperatorsByEventType(e);
}

// Check if final calculation has been completed, indicating by '=' in the entry content
function isCalculated() {
  return (entry.textContent.includes('='));
}

// Equal button event handler
function calculate() {
  if (isCalculated()) return;

  if (entry.textContent === '') entry.textContent = '0';  // If entry is empty, default answer to zero

  // Otherwise, perform calculation and append equal sign to entry's content
  ans.textContent = operate(createEntryArr());
  entry.textContent += ' =';
}

// Check if a value is a number
function isValidNumber(value) {
  return (Number.isFinite(Number(value)));
}

// Helper method for appendPercent()
function divideBy100(value) {
  return divide(Number(value), 100);
}

// Percent button event handler
function appendPercent() {
  const entryValues = createEntryArr();

  if (isCalculated()) { // Append percent to answer if calculation is done
    ans.textContent = isValidNumber(ans.textContent)
      ? divide(Number(ans.textContent), 100)
      : 'invalid input';
    return;
  }
  
  if (entryValues.length === 1) { // Append percent to first operand
    entry.textContent = divideBy100(entryValues[0]);
  } else if (entryValues.length === 3) { // Append percent to second operand and update entry's content
    entryValues[2] = divideBy100(entryValues[2]);
    entry.textContent = entryValues.join(' ');
  }
}

// Decimal button event handler
function appendDecimal() {
  const entryValues = createEntryArr();

  if (isCalculated() || entry.textContent === '') return entry.textContent = '0.'; // If calculation is done or no current entry, default first operand to 0.xxx

  if (entryValues.length === 1 && !entryValues[0].includes('.')) { // Append decimal to first operand
    entry.textContent += '.';
  } else if (entryValues.length === 2) { // If no second operand, default second operand to 0.xxx
    entry.textContent += '0.';
  } else if (entryValues.length === 3 && !entryValues[2].includes('.')) { // Append decimal to second operand and update entry's content
    entryValues[2] += '.';
    entry.textContent = entryValues.join(' ');
  }
}

// Helper method for appendNegativeSign()
function toggleNegativeSign(value) {
  return value[0] === '-' ? value.slice(1) : '-' + value;
}

// Negative button event handler
function appendNegativeSign() {
  const entryValues = createEntryArr();

  if (isCalculated()) { // Append negative sign to current answer if calculation is done
    ans.textContent = isValidNumber(ans.textContent)
      ? toggleNegativeSign(ans.textContent)
      : 'invalid input';
    return;
  }

  if (entryValues.length === 1) { // Append negative sign to first operand
    entry.textContent = toggleNegativeSign(entry.textContent);
  } else if (entryValues.length === 3) { // Append negative sign to second operand and update entry's content
    entryValues[2] = toggleNegativeSign(entryValues[2]);
    entry.textContent = entryValues.join(' ');
  }
}

// Remove last character from entry
function clearSingleEntry() {
  if (isCalculated()) return;

  const lastChar = entry.textContent.slice(-2, -1);
  const isOperator = lastChar.match(regex);

  if (isOperator) {
    entry.textContent = entry.textContent.slice(0, -3); // Remove operator with the space before and after it
  } else {
    entry.textContent = entry.textContent.slice(0, -1); // Otherwise, just remove last character
  }
}

// Reset calculator to initial state
function clearAllEntry() {
  entry.textContent = '';
  ans.textContent = '';
}

// Handle keyboard input
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumbers(e);
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperators(e);
  if (e.key === '%') appendPercent();
  if (e.key === 'Backspace') clearSingleEntry();
  if (e.key === 'Escape') clearAllEntry();
  if (e.key === 'Enter' || e.key === '=') calculate();
  if (e.key === '.') appendDecimal();
}

/*-------------------- Main Operation --------------------*/
const add = (a, b) => {
  return roundWithoutTrailingZeros(a + b);
};

const subtract = (a, b) => {
  return roundWithoutTrailingZeros(a - b);
};

const multiply = (a, b) => {
  return roundWithoutTrailingZeros(a * b);
};

const divide = (a, b) => {
  return roundWithoutTrailingZeros(a / b);
};

const roundWithoutTrailingZeros = (num, precision = 15) => {
  return Number(num.toFixed(precision)).toString();
}

const operate = (values) => {
  const operations = { '+': add, '−': subtract, '×': multiply, '÷': divide };
  const [num1, operator, num2] = [Number(values[0]), values[1], Number(values[2])];

  if (values.length === 1) return roundWithoutTrailingZeros(num1);
  if (values.length < 3) return 'missing input';

  if (operations[operator]) {
    if (operator === '÷' && num2 === 0) return ans.textContent = 'invalid input'; // Return 'invalid input' if divide by zero
    return operations[operator](num1, num2);
  }
};