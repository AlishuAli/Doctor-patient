
import React from 'react';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function Login({ setUser }) {
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      console.log(userData.photoURL);

      
      setUser({
        name: userData.displayName,
        photo: userData.photoURL,
      });

      alert(` ${userData.displayName}!`);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='login'>
      <h1>Login</h1>
      <input type='text' placeholder='Name' />
      <input type='password' placeholder='Password' />
      <input type='email' placeholder='Email' />
      <button type='submit'>Submit</button>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
}

export default Login;
