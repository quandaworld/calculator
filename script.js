const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const entry = document.getElementById('entry');
const current = document.getElementById('current');
const ac_button = document.getElementById('ac');
const ce_button = document.getElementById('ce');
const percent_button = document.getElementById('percent');
const negative_button = document.getElementById('negative');
const equal_button = document.getElementById('equal');
let firstNum = 0;
let secondNum = 0;
let operator = '';

numbers.forEach(button => {
  button.addEventListener('click', () => {
    entry.textContent += button.textContent;
    current.textContent += button.textContent;
  });
});

operators.forEach(button => {
  button.addEventListener('click', () => {
    if (entry.textContent === '') entry.textContent = '0';
    if (Number(entry.textContent[entry.textContent.length - 1])) {
      entry.textContent += ` ${button.textContent} `;
    }
    current.textContent = '';
  });
});

ac_button.addEventListener('click', () => {
  location.reload(); // will be updated to reset all variables
});

ce_button.addEventListener('click', () => {
  entry.textContent = entry.textContent.slice(0, entry.textContent.length - 1);
});

// percent_button.addEventListener('click', () => {
//   entry.textContent = '';
// });

negative_button.addEventListener('click', () => {
  const lastEntry = entry.textContent[entry.textContent.length - 1];
  if (Number(lastEntry)) {
    entry.textContent = entry.textContent.slice(0, entry.textContent.length - 1) + `-${lastEntry}`;
  }
});

equal_button.addEventListener('click', () => {
  entry.textContent = '';
});

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