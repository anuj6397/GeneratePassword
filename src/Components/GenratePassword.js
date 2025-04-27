import React, { useState } from 'react';
import './Generate.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';// <-- Important Bootstrap import!

export default function GeneratePassword() {
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [passwordLen, setPasswordLen] = useState(10);
  const [fPass, setFpass] = useState('');

  const UC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LC = 'abcdefghijklmnopqrstuvwxyz';
  const NUM = '0123456789';
  const SYM = '@#$%^&*()_|<>/';

  const createPassword = () => {
    let finalpass = '';
    let charset = '';

    if (upperCase || lowerCase || number || symbols) {
      if (upperCase) charset += UC;
      if (lowerCase) charset += LC;
      if (number) charset += NUM;
      if (symbols) charset += SYM;

      for (let i = 0; i < passwordLen; i++) {
        finalpass += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      setFpass(finalpass);
    } else {
      toast.error('Please select at least one option!');
    }
  };

  const handleSave = () => {
    if (fPass) {
      navigator.clipboard.writeText(fPass);
      toast.success('Password copied to clipboard!');
    }
  };

  return (
    <>
      <div className="container my-5 p-5 border rounded shadow-lg" style={{ maxWidth: '600px' }}>
        <h1 className="text-center mb-4 text-primary">Generate Password</h1>

        <div className="input-group mb-4">
          <input
            type="text"
            readOnly
            className="form-control"
            value={fPass}
          />
          <button
            className="btn btn-success"
            onClick={handleSave}
            disabled={!fPass}
          >
            Save
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Password Length:</label>
          <input
            type="number"
            className="form-control"
            min={5}
            max={20}
            value={passwordLen}
            onChange={(e) => setPasswordLen(Number(e.target.value))}
          />
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={upperCase}
            onChange={() => setUpperCase(!upperCase)}
            id="uppercaseCheck"
          />
          <label className="form-check-label" htmlFor="uppercaseCheck">
            Include Uppercase Letters
          </label>
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={lowerCase}
            onChange={() => setLowerCase(!lowerCase)}
            id="lowercaseCheck"
          />
          <label className="form-check-label" htmlFor="lowercaseCheck">
            Include Lowercase Letters
          </label>
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={number}
            onChange={() => setNumber(!number)}
            id="numberCheck"
          />
          <label className="form-check-label" htmlFor="numberCheck">
            Include Numbers
          </label>
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={symbols}
            onChange={() => setSymbols(!symbols)}
            id="symbolCheck"
          />
          <label className="form-check-label" htmlFor="symbolCheck">
            Include Symbols
          </label>
        </div>

        <button
          className="btn btn-danger w-100 mt-4"
          onClick={createPassword}
        >
          Generate Password
        </button>
      </div>

      <ToastContainer />
    </>
  );
}
