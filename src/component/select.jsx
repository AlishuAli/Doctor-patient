import React from 'react'
import { Link } from 'react-router-dom';

function Select() {
  return (
    <div id='select'>
      <h1>Login as a</h1>
      <div id='pic'>
      <Link to="/patient">
          <button id='btn1'>Patient</button>
        </Link>
        <Link to="/doclog">
          <button id='btn2'>Doctor</button>
        </Link>
      </div>
    </div>
  )
}

export default Select
