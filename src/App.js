import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard1 from './components/Dashboard1';
import Dashboard2 from './components/Dashboard2';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/" element={<Dashboard1 />} />
      </Routes>
    </Router>
  );
}

export default App;
