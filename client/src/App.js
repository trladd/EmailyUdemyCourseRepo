import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Hi There</h2>
        <a href="/auth/google">Sign in With Google</a>
      </header>
    </div>
  );
}

export default App;
