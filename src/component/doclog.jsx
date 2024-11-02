
// import React from 'react';
// import { auth } from '../config/firebase';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { Link } from 'react-router-dom';

// function Doplog({ setUser }) {
//   const loginWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const userData = result.user;
//       console.log(userData.photoURL);

      
//       setUser({
//         name: userData.displayName,
//         photo: userData.photoURL,
//       });

//       alert(` ${userData.displayName}!`);
      
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div id='login'>
//       <h1>Login</h1>
//       <input type='text' placeholder='Name' />
//       <input type='password' placeholder='Password' />
//       <input type='email' placeholder='Email' />
//       <button type='submit'>Submit</button>
//       <button onClick={loginWithGoogle}>Login with Google</button>
//       <div>
//       <span>not Registered?</span>
//       <Link to="/docreg">
//          <span>Create account</span>
//         </Link>
//         </div>import React from 'react';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Doplog({ setUser }) {
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;

      setUser({
        name: userData.displayName,
        photo: userData.photoURL,
      });

      alert(`Welcome, ${userData.displayName}!`);
      
      // Navigate to the Doctor Dashboard and pass user data
      navigate('/doctor-dashboard', { state: { user: { name: userData.displayName, photo: userData.photoURL } } });
      
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
      <div>
        <span>not Registered?</span>
        <Link to="/docreg">
           <span>Create account</span>
        </Link>
      </div>
    </div>
  );
}

export default Doplog;


//     </div>
//   );
// }

// export default Doplog;

