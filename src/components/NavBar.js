import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/dashboard1">Today's Sales</Link></li>
        <li><Link to="/dashboard2">Sales Comparison</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
