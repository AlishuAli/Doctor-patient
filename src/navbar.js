import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
  console.log('Navbar user:', user);
  return (
    <div className="navbar"> 
      <Link to='/home'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/Contact'>Add-post</Link>
      {/* <Link to='/Login' id='log'>Login</Link> */}
      {user ? (
        <div className="user-info" >
          <img
  src={user.photo || 'https://via.placeholder.com/30'}
  alt="User Avatar"
  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
/>



          <span id="name"> {user.name}</span>
        </div>
      ) : (
        <Link to='/login' id='log'>Login</Link>
      )}
    </div>
  );
}

export default Navbar; 
