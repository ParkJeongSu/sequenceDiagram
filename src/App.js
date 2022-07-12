import React, { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  let test = `graph LR
  A --- B
  B-->C[fa:fa-ban forbidden]
  B-->C[fa:fa-ban forbidden]
  B-->D(fa:fa-spinner);`;
  return (
    <div className="App">
      <Dashboard test={test}></Dashboard>
    </div>
  );
}

export default App;


