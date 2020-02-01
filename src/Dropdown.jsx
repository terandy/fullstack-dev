import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';

let Dropdown = props => {
  return (
    <div className="dropdown-container">
      <div className="dropdown-button">{props.name}</div>
      <div className="dropdown-content hideDesktop">{props.children}</div>
    </div>
  );
};

export default Dropdown;
