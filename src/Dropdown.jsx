import React, { Component } from 'react';

let Dropdown = (navItem, dropdownElements) => {
  return (
    <div className="dropdown-container">
      <div className="dropdown-button">{navItem}</div>
      <div className="dropdown-content">{dropdownElements}</div>
    </div>
  );
};

export default Dropdown;
