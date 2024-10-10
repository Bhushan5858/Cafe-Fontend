import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './compocss/profile.css';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { FaFacebook, FaInstagram, FaGoogle, FaUserTie } from 'react-icons/fa';
import { TbLogout } from "react-icons/tb";
import Swal from 'sweetalert2'; // Import SweetAlert2

const Profile = () => {
  const [animationData, setAnimationData] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://lottie.host/2c1f327d-b548-4807-b759-d8b679adca2d/Txg9sCnnLh.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error('No auth token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/User/Profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch user profile. Please try again later.',
          icon: 'error',
        });
      }
    };

    fetchUserProfile();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    Swal.fire({
      title: 'Logged Out!',
      text: 'You have been logged out successfully.',
      icon: 'success',
    }).then(() => {
      navigate('/'); // Redirect to home after alert is closed
    });
  };

  return (
    <div className='profile-con'>
      <div className='con'>
        <motion.div className='svg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {animationData && <Lottie animationData={animationData} loop={true} style={{ width: '100%', height: '120%' }} />}
        </motion.div>

        <div className='info'>
          {userData ? (
            <>
              <h1>{userData.username}</h1>
              <p>{userData.email}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        
        <div className='btns'>
          <button className='btn' onClick={() => navigate('/UserReservation')}>My Reservation</button>
          <button className='btn' onClick={() => navigate('/Home')}>Back To Home</button>
        </div>

        <div className='icons'>
          <a href="https://www.facebook.com" className="icon"><FaFacebook /></a>
          <a href="https://www.instagram.com" className="icon"><FaInstagram /></a>
          <a href="https://www.google.com" className="icon"><FaGoogle /></a>
          
          {userData && userData.role === "ADMIN" && (
            <FaUserTie className="icon log-out" onClick={() => navigate('/AllReservation')} />
          )}

          <TbLogout className="icon log-out" onClick={handleLogout} />
        </div>

        <div className='note'>
          <p>'' Fuel Your Day with Flavor and Fun! ''</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
