
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
  console.log('Navbar user:', user);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar"> 
      <h4 id='logo'>MedLine</h4>
      <Link to='/home'>Home</Link>
      {/* <Link to="#about">About</Link> */}
      <a href="#about" >About</a>
      <Link to='/patientDashboard'>Doctors Avaliable</Link>
      <Link to='/doctorDashboard'>Doctors schedule</Link>
      
      <div className="dropdown" onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
        <span className="dropdown-toggle" style={{ color: 'white' }}>Category</span>
        {showDropdown && (
          <div className="dropdown-menu">
            <Link to="/category/general">Illness&Infection</Link>
            <Link to="/category/specialty">Heart Health</Link>
            <Link to="/category/wellness">Skin Care</Link>
            <Link to="/category/wellness">Women Health</Link>
          </div>
        )}
      </div>

      {user ? (
        <div className="user-info">
          <img
            src={user.photo || 'https://via.placeholder.com/30'}
            alt="User Avatar"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
          <span id="name"> {user.name}</span>
        </div>
      ) : (
        <Link to='/select' id='log'>Login</Link>
      )}
      <Link to='/bookAppointment'>
      <button id='book'> Book Appointment</button>
      </Link>
    </div>
  );
}

export default Navbar;

