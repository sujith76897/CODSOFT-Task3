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
  if (/[\+\-\×\÷]$/.test(expression.trim())) {
    expression = expression.trim().slice(0, -1) + ` ${op} `;
  } else if (currentInput !== '' || op === '-') {
    expression += ` ${op} `;
    currentInput = '';
  }
  shouldResetDisplay = false;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  expression = '';
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== '0' && currentInput !== '') {
    currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
    const lastNumMatch = expression.match(/-?\d+(\.\d+)?$/);
    if (lastNumMatch) {
      expression = expression.slice(0, -lastNumMatch[0].length) + currentInput;
    }
    updateDisplay();
  }
}

function calculateResult() {
  try {
    const safeExpression = expression.replace(/÷/g, '/').replace(/×/g, '*');
    const result = eval(safeExpression);
    expression = result.toString();
    currentInput = expression;
    shouldResetDisplay = true;
  } catch (error) {
    expression = 'Error';
    currentInput = '';
    shouldResetDisplay = true;
  }
  updateDisplay();
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const buttonType = button.getAttribute('data-type');
    const buttonValue = button.getAttribute('data-value') || button.textContent;

    if (buttonType === 'number') {
      inputNumber(buttonValue);
    } else if (buttonType === 'operator') {
      inputOperator(buttonValue);
    } else {
      switch (buttonType) {
        case 'clear':
          clearDisplay();
          break;
        case 'sign':
          toggleSign();
          break;
        case 'equals':
          calculateResult();
          break;
        case 'decimal':
          if (!currentInput.includes('.')) {
            inputNumber('.');
          }
          break;
      }
    }
  });
});
