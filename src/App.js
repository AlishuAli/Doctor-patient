// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import Home from './component/home';
import About from './component/about';
import Contact from './component/uploadImg';
import Login from './component/login';
import Navbar from './navbar';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Router>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          
          <Route path='/login' element={<Login setUser={setUser}/>}/>
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
