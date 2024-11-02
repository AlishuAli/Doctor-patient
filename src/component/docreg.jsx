import React, { useState } from 'react';
import { database } from '../config/firebase'; // Adjust the path as needed
import { collection, addDoc } from 'firebase/firestore';
 // Import your CSS file for styling

const DoctorRegistration = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorName || !specialty || !phone || !email) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(database, 'doctors'), {
        name: doctorName,
        specialty,
        phone,
        email,
      });
      setSuccessMessage('Doctor registered successfully!');
      setError('');
      clearForm();
    } catch (error) {
      setError('Error registering doctor. Please try again.');
      console.error('Error adding document: ', error);
    }
  };

  const clearForm = () => {
    setDoctorName('');
    setSpecialty('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="doctor-registration">
      <h1>Doctor Registration</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="doctorName">Doctor Name:</label>
          <input
            type="text"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialty">Specialty:</label>
          <input
            type="text"
            id="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register Doctor</button>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  );
};

export default DoctorRegistration;
