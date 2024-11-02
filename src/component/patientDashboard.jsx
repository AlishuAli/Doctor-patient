import React from 'react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  
  const doctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Jones', specialty: 'Dermatology' },
    { id: 3, name: 'Dr. Brown', specialty: 'Pediatrics' },
    { id: 4, name: 'Dr. Taylor', specialty: 'Orthopedics' },
    { id: 5, name: 'Dr. Wilson', specialty: 'Neurology' },
  ];

  return (
    <div>
      <h1>Patient Dashboard</h1>
      <h2>Available Doctors</h2>
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Specialty</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.specialty}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <Link to="/bookAppointment">
                    <button style={{ marginRight: '5px' }}>Book Appointment</button>
                  </Link>
                  <button style={{ marginRight: '5px' }}>Reschedule</button>
                  <button>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientDashboard;
