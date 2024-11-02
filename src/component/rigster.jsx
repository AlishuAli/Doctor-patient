
// import React, { useState } from 'react';
// import { auth, database } from '../config/firebase'; 
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';

// function Register() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       setSuccessMessage('');
//       return;
//     }

//     try {
     
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       await setDoc(doc(database, 'users', user.uid), {
//         username,
//         email: user.email,
//         phone,
//         createdAt: new Date(),
//       });

//       setUsername('');
//       setEmail('');
//       setPassword('');
//       setConfirmPassword('');
//       setPhone('');
//       setSuccessMessage(`Registration successful! Welcome, ${username}.`);
//       setError('');
//     } catch (err) {
//       if (err.code === 'auth/email-already-in-use') {
//         setError('The email address is already in use by another account.');
//       } else if (err.code === 'auth/invalid-email') {
//         setError('The email address is not valid.');
//       } else if (err.code === 'auth/weak-password') {
//         setError('The password is too weak. It should be at least 6 characters.');
//       } else if (err.code === 'auth/operation-not-allowed') {
//         setError('Email/Password authentication is not enabled. Please enable it in the Firebase Console.');
//       } else {
//         setError(err.message);
//       }
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div id='reg'>
//       <h1>Register</h1>
//       <div id='regi'>
//       <form onSubmit={handleSubmit}>
//         <input
//           type='text'
//           placeholder='Username'
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type='email'
//           placeholder='Email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type='password'
//           placeholder='Password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type='password'
//           placeholder='Confirm Password'
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <input
//           type='tel'
//           placeholder='Phone Number'
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <button type='submit'>Register</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       </div>
//     </div>
//   );
// }

// export default Register;
import React, { useState } from 'react';
import { auth, database } from '../config/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccessMessage('');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(database, 'users', user.uid), {
        username,
        email: user.email,
        phone,
        createdAt: new Date(),
      });

      // Clear the form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhone('');
      setSuccessMessage(`Registration successful! Welcome, ${username}.`);
      setError('');

      // Redirect to Patient Dashboard
      navigate('/patientDashboard'); // Use navigate here

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else if (err.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      } else if (err.code === 'auth/weak-password') {
        setError('The password is too weak. It should be at least 6 characters.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled. Please enable it in the Firebase Console.');
      } else {
        setError(err.message);
      }
      setSuccessMessage('');
    }
  };

  return (
    <div id='reg'>
      <h1>Register</h1>
      <div id='regi'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type='tel'
            placeholder='Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type='submit'>Register</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
}

export default Register;



