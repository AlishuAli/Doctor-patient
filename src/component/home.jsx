
import React from 'react';
import { Link } from 'react-router-dom';
 // Make sure to create and link this CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to HealthCare</h1>
        <p>Your health, our priority. Book your appointments with ease!</p>
        <Link to='/select'>
        <button className="cta-button">Get Started</button>
        </Link>
      </section>

      <section id="features" className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Easy Appointment Booking</h3>
            <p>Schedule your appointments in a few clicks.</p>
          </div>
          <div className="feature">
            <h3>Access Patient Records</h3>
            <p>View and manage patient information securely.</p>
          </div>
          <div className="feature">
            <h3>Consult with Doctors</h3>
            <p>Get in touch with healthcare professionals anytime.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <p>We are dedicated to providing the best healthcare services.</p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 HealthCare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

