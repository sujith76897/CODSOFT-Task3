let currentInput = '0';
let expression = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');

function updateDisplay() {
  display.textContent = expression || currentInput;
}

function inputNumber(num) {
  if (shouldResetDisplay) {
    currentInput = num;
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput === '0' ? num : currentInput + num;
  }
  expression += num;
  updateDisplay();
}

function inputOperator(op) {
  if (shouldResetDisplay && op !== '-') {
    expression = currentInput;
  }
  expression += ` ${op} `;
  currentInput = '';
  shouldResetDisplay = false;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  expression = '';
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== '0') {
    currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
    expression = expression.slice(0, -currentInput.length) + currentInput;
    updateDisplay();
  }
}

function calculateResult() {
  try {
    const result = eval(expression.replace('÷', '/').replace('×', '*'));
    expression = result.toString();
    currentInput = expression;
    shouldResetDisplay = true;
  } catch (error) {
    expression = 'Error';
  }
  updateDisplay();
}
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;
    
    if (!isNaN(buttonValue) || buttonValue === '.') {
      if (buttonValue === '.' && currentInput.includes('.')) return;
      inputNumber(buttonValue);
    } else {
      switch (buttonValue) {
        case 'C':
          clearDisplay();
          break;
        case '+/-':
          toggleSign();
          break;
        case '=':
          calculateResult();
          break;
        default:
          inputOperator(buttonValue);
      }
    }
  });
});
