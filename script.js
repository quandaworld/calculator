const displayed = document.querySelectorAll('.displayed');
const entry = document.getElementById('entry');
let firstNum = 0;
let secondNum = 0;
let operator = '';

displayed.forEach(button => {
  button.addEventListener('click', () => {
    entry.textContent += button.textContent;
  });
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