
import React, { useState, useEffect } from 'react';
import { database } from '../config/firebase'; // Adjust the path as needed
import { collection, getDocs } from 'firebase/firestore';
 // Import your CSS file for styling

const DoctorInterface = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointmentData = await getDocs(collection(database, 'appointments'));
      const appointmentsList = appointmentData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appointmentsList);
    };

    const fetchPatients = async () => {
      const patientData = await getDocs(collection(database, 'patients'));
      const patientsList = patientData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(patientsList);
    };

    fetchAppointments();
    fetchPatients();
  }, []);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="doctor-interface">
      <header className="doctor-header">
        <h1>Welcome, Doctor</h1>
        <p>Your Schedule for Today</p>
      </header>
      <section className="appointments-section">
        <h2>Your Appointments</h2>
        <div className="appointments-list">
          {appointments.length === 0 ? (
            <p>No appointments scheduled.</p>
          ) : (
            appointments.map(appointment => (
              <div className="appointment-card" key={appointment.id}>
                <h3>{appointment.doctor}</h3>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <button onClick={() => handlePatientSelect(appointment)}>View Patient</button>
              </div>
            ))
          )}
        </div>
      </section>
      <section className="patients-section">
        <h2>Patient List</h2>
        <div className="patients-list">
          {patients.length === 0 ? (
            <p>No patients available.</p>
          ) : (
            patients.map(patient => (
              <div className="patient-card" key={patient.id} onClick={() => handlePatientSelect(patient)}>
                <h3>{patient.name}</h3>
                <p>Phone: {patient.phone}</p>
              </div>
            ))
          )}
        </div>
      </section>
      {selectedPatient && (
        <section className="patient-details">
          <h2>Patient Details</h2>
          <p>Name: {selectedPatient.name}</p>
          <p>Phone: {selectedPatient.phone}</p>
          <p>Medical History: {selectedPatient.medicalHistory}</p>
          <button onClick={() => setSelectedPatient(null)}>Close</button>
        </section>
      )}
    </div>
  );
};

export default DoctorInterface;

