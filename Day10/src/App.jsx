import { useState } from 'react';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => Math.max(0, prev - step));
  const reset = () => setCount(0);

  return (
    <div className="container">
      <div className="counter-card">
        <span className="tag">DAY 10 | REACT HOOKS</span>
        <h1>State Management with useState</h1>
        <p className="subtitle">Interactive Counter Application</p>

        <div className="count-display">
          <span className="number">{count}</span>
        </div>

        <div className="step-selector">
          <label>Step Size:</label>
          <select value={step} onChange={(e) => setStep(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className="btn-group">
          <button className="btn-action minus" onClick={decrement} disabled={count === 0}>
            - {step}
          </button>
          <button className="btn-action reset" onClick={reset}>
            Reset
          </button>
          <button className="btn-action plus" onClick={increment}>
            + {step}
          </button>
        </div>
      </div>
    </div>
  );
}
