import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [currentOperation, setCurrentOperation] = useState('0');
  const [lastOperation, setLastOperation] = useState('');
  const [shouldResetScreen, setShouldResetScreen] = useState(false);

  const appendNumber = (number) => {
    if (currentOperation === '0' || shouldResetScreen) {
      setCurrentOperation(number);
      setShouldResetScreen(false);
    } else {
      setCurrentOperation((prev) => prev + number);
    }
  };

  const resetScreen = () => {
    setCurrentOperation('');
    setShouldResetScreen(false);
  };

  const clear = () => {
    setCurrentOperation('0');
    setLastOperation('');
  };

  const appendPoint = () => {
    if (shouldResetScreen) resetScreen();
    if (!currentOperation.includes('.')) {
      setCurrentOperation((prev) => prev + '.');
    }
  };

  const deleteNumber = () => {
    setCurrentOperation((prev) => prev.slice(0, -1));
  };

  const setOperation = (operator) => {
    if (currentOperation !== '') {
      evaluate();
      setShouldResetScreen(true);
      setLastOperation(currentOperation + ' ' + operator);
      setCurrentOperation('');
    }
  };

  const evaluate = () => {
    if (currentOperation === '') return;
  
    let result;
    const firstOperand = parseFloat(lastOperation);
    const secondOperand = parseFloat(currentOperation);
  
    switch (lastOperation.slice(-1)) {
      case '+':
        result = firstOperand + secondOperand;
        break;
      case '-':
        result = firstOperand - secondOperand;
        break;
      case '×':
        result = firstOperand * secondOperand;
        break;
      case '÷':
        result = firstOperand / secondOperand;
        break;
      default:
        return;
    }
  
    const roundedResult = roundResult(result, 2); // Round the result to 2 decimal places
    setCurrentOperation(roundedResult.toString());
    setLastOperation('');
  };

  const roundResult = (number, decimalPlaces) => {
    const factor = 10 ** decimalPlaces;
    return Math.round(number * factor) / factor;
  };

  return (
    <main className="main">
      <div className="calculator">
        <div className="screen">
          <div className="screen-last">{lastOperation}</div>
          <div className="screen-current">{currentOperation}</div>
        </div>
        <div className="buttons-grid">
          <button className="btn btn-red span-2" onClick={clear}>
            CLEAR
          </button>
          <button className="btn btn-blue span-2" onClick={deleteNumber}>
            DELETE
          </button>
          <button className="btn" onClick={() => appendNumber('7')}>
            7
          </button>
          <button className="btn" onClick={() => appendNumber('8')}>
            8
          </button>
          <button className="btn" onClick={() => appendNumber('9')}>
            9
          </button>
          <button className="btn" onClick={() => setOperation('÷')}>
            ÷
          </button>
          <button className="btn" onClick={() => appendNumber('4')}>
            4
          </button>
          <button className="btn" onClick={() => appendNumber('5')}>
            5
          </button>
          <button className="btn" onClick={() => appendNumber('6')}>
            6
          </button>
          <button className="btn" onClick={() => setOperation('×')}>
            ×
          </button>
          <button className="btn" onClick={() => appendNumber('1')}>
            1
          </button>
          <button className="btn" onClick={() => appendNumber('2')}>
            2
          </button>
          <button className="btn" onClick={() => appendNumber('3')}>
            3
          </button>
          <button className="btn" onClick={() => setOperation('-')}>
            -
          </button>
          <button className="btn" onClick={() => appendNumber('0')}>
            0
          </button>
          <button className="btn" onClick={appendPoint}>
            .
          </button>
          <button className="btn btn-orange" onClick={evaluate}>
            =
          </button>
          <button className="btn" onClick={() => setOperation('+')}>
            +
          </button>
        </div>
    </div>
    </main>
    );
};

export default Calculator;
