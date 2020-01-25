import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';


let Dropdown = (navItem, dropdownElements) => {
  return (
    <div className="dropdown-container">
        <Link to="/login"><div className="dropdown-button">{navItem}</div></Link>
        <div className="dropdown-content hideDesktop">{dropdownElements}</div>
    </div>
  );
};

export default Dropdown;
