// Navbar.jsx
import React, { useState} from 'react';
import './../compocss/subcompoCss/navbar.css'; // Ensure you have the correct path to your CSS file
import logo from './../../Assets/logo.png'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="logo"><img src={logo} alt='logo'></img></div>
      <div className="menu-button" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`nav-items ${menuOpen ? 'show' : ''}`}>
        <li><a href="#herosection">Home</a></li>
        <li><a href="#ourspecial">Menu</a></li>
        <li><a href="#reservation">Reservation</a></li>
        <li><a href="#aboutus">About Us</a></li>
        <li><a href="#contactus">Contact Us</a></li>
        <li><button className='prof-btn' onClick={()=>{ navigate('/Profile');}}>Profile</button></li>
      </ul>
    </div>
  );
};

export default Navbar;
