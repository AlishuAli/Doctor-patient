// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import Home from './component/home';
import About from './component/about';
import Contact from './component/category';
import Login from './component/patient';
import Navbar from './navbar';
import Select from './component/select';
import { useState } from 'react';
import Doctor from './component/doctor';
import Rigster from './component/rigster';
import PatientDashboard from './component/patientDashboard';
import AppointmentPage from './component/bookAppointment';
import DoctorInterface from './component/doctorAppointment';
import Doplog from './component/doclog';
import DoctorRegistration from './component/docreg';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Router>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/doctor' element={<Doctor/>}/>
          <Route path='/doclog' element={<Doplog/>}/>
          <Route path='/docreg' element={<DoctorRegistration/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/bookAppointment' element={<AppointmentPage/>}/>
          <Route path='/rigster' element={<Rigster/>}/>
          <Route path='/patientDashboard' element={<PatientDashboard/>}/>
          <Route path='/doctorDashboard' element={<DoctorInterface/>}/>
          <Route path='/patient' element={<Login setUser={setUser}/> }/>
          
          
          
          {/* <Route path='/login' element={<Login setUser={setUser}/>}/> */}
          <Route path='/select' element={<Select/>}/>
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
