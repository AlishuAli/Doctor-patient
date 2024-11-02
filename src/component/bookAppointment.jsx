
// import React, { useState, useEffect } from 'react';
// import { database } from '../config/firebase'; // Adjust the path as needed
// import { collection, addDoc } from 'firebase/firestore';

// const AppointmentPage = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [appointmentDate, setAppointmentDate] = useState('');
//   const [appointmentTime, setAppointmentTime] = useState('');
//   const [patientName, setPatientName] = useState('');
//   const [patientPhone, setPatientPhone] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Simulate fetching doctor data
//     const fetchDoctors = async () => {
//       const doctorData = [
//         { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
//         { id: 2, name: 'Dr. Jones', specialty: 'Dermatology' },
//         { id: 3, name: 'Dr. Brown', specialty: 'Pediatrics' },
//         { id: 4, name: 'Dr. Taylor', specialty: 'Orthopedics' },
//         { id: 5, name: 'Dr. Wilson', specialty: 'Neurology' },
//       ];
//       setDoctors(doctorData);
//     };
//     fetchDoctors();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedDoctor || !appointmentDate || !appointmentTime || !patientName || !patientPhone) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     try {
//       // Add the appointment data to Firestore
//       await addDoc(collection(database, 'appointments'), {
//         doctor: selectedDoctor,
//         date: appointmentDate,
//         time: appointmentTime,
//         patientName,
//         patientPhone,
//       });
//       setMessage(`Appointment booked successfully with ${selectedDoctor} on ${appointmentDate} at ${appointmentTime}.`);
//       setError('');
//       clearForm();
//     } catch (error) {
//       setError('Error booking appointment. Please try again.');
//       console.error('Error adding document: ', error);
//     }
//   };

//   const clearForm = () => {
//     setSelectedDoctor('');
//     setAppointmentDate('');
//     setAppointmentTime('');
//     setPatientName('');
//     setPatientPhone('');
//   };

//   return (
//     <div className="appointment-page">
//       <h1>Book an Appointment</h1>
//       <form onSubmit={handleSubmit} className="appointment-form">
//         <div className="form-group">
//           <label htmlFor="doctor">Select Doctor:</label>
//           <select
//             id="doctor"
//             value={selectedDoctor}
//             onChange={(e) => setSelectedDoctor(e.target.value)}
//             required
//           >
//             <option value="">Select a doctor</option>
//             {doctors.map((doctor) => (
//               <option key={doctor.id} value={doctor.name}>
//                 {doctor.name} - {doctor.specialty}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="date">Appointment Date:</label>
//           <input
//             type="date"
//             id="date"
//             value={appointmentDate}
//             onChange={(e) => setAppointmentDate(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="time">Appointment Time:</label>
//           <input
//             type="time"
//             id="time"
//             value={appointmentTime}
//             onChange={(e) => setAppointmentTime(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="patientName">Your Name:</label>
//           <input
//             type="text"
//             id="patientName"
//             value={patientName}
//             onChange={(e) => setPatientName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="patientPhone">Your Phone:</label>
//           <input
//             type="tel"
//             id="patientPhone"
//             value={patientPhone}
//             onChange={(e) => setPatientPhone(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Book Appointment</button>
//         {error && <p className="error">{error}</p>}
//         {message && <p className="success">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default AppointmentPage;


import React, { useState, useEffect } from 'react';
import { database } from '../config/firebase'; // Adjust the path as needed
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const AppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isRescheduling, setIsRescheduling] = useState(false); // New state for rescheduling
  const [appointmentId, setAppointmentId] = useState(''); // Store the appointment ID
  const [existingAppointments, setExistingAppointments] = useState([]); // State for existing appointments

  useEffect(() => {
    // Simulate fetching doctor data
    const fetchDoctors = async () => {
      const doctorData = [
        { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
        { id: 2, name: 'Dr. Jones', specialty: 'Dermatology' },
        { id: 3, name: 'Dr. Brown', specialty: 'Pediatrics' },
        { id: 4, name: 'Dr. Taylor', specialty: 'Orthopedics' },
        { id: 5, name: 'Dr. Wilson', specialty: 'Neurology' },
      ];
      setDoctors(doctorData);
    };
    fetchDoctors();

    // Fetch existing appointments from Firestore (for demonstration, we're simulating this)
    const fetchAppointments = async () => {
      // Replace with actual fetching logic
      const appointmentsData = [
        { id: 'appointment1', doctor: 'Dr. Smith', date: '2024-11-10', time: '10:00 AM', patientName: 'John Doe', patientPhone: '1234567890' },
        // Add more sample appointments as needed
      ];
      setExistingAppointments(appointmentsData);
    };
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !appointmentDate || !appointmentTime || !patientName || !patientPhone) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      if (isRescheduling && appointmentId) {
        // Update existing appointment
        const appointmentRef = doc(database, 'appointments', appointmentId);
        await updateDoc(appointmentRef, {
          doctor: selectedDoctor,
          date: appointmentDate,
          time: appointmentTime,
          patientName,
          patientPhone,
        });
        setMessage(`Appointment rescheduled successfully with ${selectedDoctor} on ${appointmentDate} at ${appointmentTime}.`);
      } else {
        // Add a new appointment
        await addDoc(collection(database, 'appointments'), {
          doctor: selectedDoctor,
          date: appointmentDate,
          time: appointmentTime,
          patientName,
          patientPhone,
        });
        setMessage(`Appointment booked successfully with ${selectedDoctor} on ${appointmentDate} at ${appointmentTime}.`);
      }
      setError('');
      clearForm();
    } catch (error) {
      setError('Error booking appointment. Please try again.');
      console.error('Error adding document: ', error);
    }
  };

  const clearForm = () => {
    setSelectedDoctor('');
    setAppointmentDate('');
    setAppointmentTime('');
    setPatientName('');
    setPatientPhone('');
    setIsRescheduling(false); // Reset reschedule state
    setAppointmentId(''); // Reset appointment ID
  };

  const handleReschedule = (appointment) => {
    setSelectedDoctor(appointment.doctor);
    setAppointmentDate(appointment.date);
    setAppointmentTime(appointment.time);
    setPatientName(appointment.patientName);
    setPatientPhone(appointment.patientPhone);
    setIsRescheduling(true);
    setAppointmentId(appointment.id); // Store the ID of the appointment to be rescheduled
  };

  const handleCancel = async (id) => {
    try {
      // Delete the appointment from Firestore
      const appointmentRef = doc(database, 'appointments', id);
      await deleteDoc(appointmentRef);
      setMessage('Appointment cancelled successfully.');
      setExistingAppointments(existingAppointments.filter(app => app.id !== id)); // Remove from state
    } catch (error) {
      setError('Error cancelling appointment. Please try again.');
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <div className="appointment-page">
      <h1>{isRescheduling ? 'Reschedule Appointment' : 'Book an Appointment'}</h1>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="doctor">Select Doctor:</label>
          <select
            id="doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Appointment Date:</label>
          <input
            type="date"
            id="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Appointment Time:</label>
          <input
            type="time"
            id="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="patientName">Your Name:</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="patientPhone">Your Phone:</label>
          <input
            type="tel"
            id="patientPhone"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRescheduling ? 'Reschedule Appointment' : 'Book Appointment'}</button>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
      </form>

      {/* Display existing appointments to reschedule or cancel */}
      <div className="existing-appointments">
        <h2>Your Appointments</h2>
        <ul>
          {existingAppointments.map((appointment) => (
            <li key={appointment.id}>
              Appointment with {appointment.doctor} on {appointment.date} at {appointment.time} 
              <button onClick={() => handleReschedule(appointment)}>Reschedule</button>
              <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentPage;


